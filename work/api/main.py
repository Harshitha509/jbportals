import pymysql
from app import app
from config import mysql
from flask import jsonify
from flask import flash, request



# define a route to fetch completed orders data
@app.route('/completed-orders', methods=['GET'])
def get_completed_orders():
    cursor = None
    conn = None
    try:
       print("Trying to connect to MySQL...")
       conn = mysql.connect()
       print("Connected to MySQL.")
       cursor = conn.cursor(pymysql.cursors.DictCursor)
       print("Executing SQL query...")
    
       cursor.execute('SELECT * FROM completed_orders')
       completed_orders = cursor.fetchall()
       print("Query executed successfully.")
   
       response = jsonify(completed_orders)
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



if __name__ == "__main__":
    app.run(port=5000)