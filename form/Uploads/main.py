import pymysql
from app import app
from config import mysql
from flask import jsonify
from flask import flash, request

@app.route('/create', methods=['POST'])
def create_branch():
    try:        
        _json = request.json
        _pk =  _json['pk']
        _id =  _json['id']
        _name = _json['name']
        if _pk and _name and _id and request.method == 'POST':
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)		
            sqlQuery = "INSERT INTO branch(pk,id,name) VALUES( %s, %s, %s)"
            bindData = (_pk,_id,_name)            
            cursor.execute(sqlQuery, bindData)
            conn.commit()
            respone = jsonify('Employee added successfully!')
            respone.status_code = 200
            return respone
        else:
            return showMessage()
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
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