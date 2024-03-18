import pymysql
from app import app
from config import mysql
from flask import jsonify, request
import uuid



@app.route('/submit-student', methods=['POST'])
def submit_student():
    conn = None
    cursor = None
    try:
        _json = request.json
        _student_id= _json['student_id']
        _first_name = _json['first_name']
        _last_name = _json['last_name']
        _batch_name = _json['batch_name']
        _date_of_birth = _json['date_of_birth']
        _student_hobbies = _json.get('student_hobbies', '')
        _student_address = _json.get('student_address', '')
        _student_location = _json.get('student_location', '')
        _student_emergency_contact = _json.get('student_emergency_contact', '')
        _student_physician = _json.get('student_physician', '')
        _student_allergies = _json.get('student_allergies', '')
        _student_chronic_illness = _json.get('student_chronic_illness', '')
        _student_medication = _json.get('student_medication', '')
        _student_special_note = _json.get('student_special_note', '')

        if _first_name and _last_name and _batch_name and _date_of_birth and request.method == 'POST':
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            # Generating a UUID for student_id
            _student_id = str(uuid.uuid4())

            sql_query = """
                INSERT INTO Students
                (student_id, first_name, last_name, batch_name, date_of_birth, student_hobbies,
                student_address, student_location, student_emergency_contact,
                student_physician, student_allergies, student_chronic_illness,
                student_medication, student_special_note)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            bind_data = (
                _student_id, _first_name, _last_name, _batch_name, _date_of_birth,
                _student_hobbies, _student_address, _student_location,
                _student_emergency_contact, _student_physician,
                _student_allergies, _student_chronic_illness,
                _student_medication, _student_special_note
            )
            cursor.execute(sql_query, bind_data)
            conn.commit()

            response = jsonify('Student data submitted successfully!')
            response.status_code = 200
            return response
        else:
            return show_message()
    except Exception as err:
        print(err)
        return show_message()
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
@app.route('/api/attendances', methods=['POST'])
def add_attendance():
    try:
        data = request.json

        batch_name = data['batch_name']
        first_name = data['first_name']
        last_name = data['last_name']
        date = data['date']
        day = data['day']
        status = data['status']
        hours_attended = data.get('hours_attended', None)
        reason_for_absence = data.get('reason_for_absence', None)

        conn = mysql.connect()
        cursor = conn.cursor()

        # Check if the student exists
        student_query = "SELECT * FROM Students WHERE batch_name = %s AND first_name = %s AND last_name = %s"
        cursor.execute(student_query, (batch_name, first_name, last_name))
        student = cursor.fetchone()

        if not student:
            return jsonify({'error': 'Student not found'}), 404

        # Insert the attendance record
        attendance_query = "INSERT INTO Attendances (batch_name, first_name, last_name, date, day, status, hours_attended, reason_for_absence) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(attendance_query, (batch_name, first_name, last_name, date, day, status, hours_attended, reason_for_absence))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Attendance record added successfully'}), 201

    except Exception as err:
        print("Error:", err)
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/api/students', methods=['GET'])
def get_students():
    cursor = None
    conn = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM Students")
        students = cursor.fetchall()

        response = jsonify(students)
        response.status_code = 200
        return response

    except Exception as err:
        print("Error:", err)
        return jsonify({'error': 'Internal Server Error'}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/api/students/<batch_name>', methods=['GET'])
def get_students_by_batch(batch_name):
    cursor = None
    conn = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        query = "SELECT * FROM Students WHERE batch_name = %s"
        cursor.execute(query, (batch_name,))
        students = cursor.fetchall()

        if not students:
            return jsonify({'error': 'No students found for the specified batch'}), 404

        response = jsonify(students)
        response.status_code = 200
        return response

    except Exception as err:
        print("Error:", err)
        return jsonify({'error': 'Internal Server Error'}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
@app.errorhandler(404)
def showMessage(error=None):
    message = {
        'status': 404,
        'message': 'Record not found: ' + request.url,
    }
    respone = jsonify(message)
    respone.status_code = 404
    return respone

if __name__ == "__main__":
    app.run()
