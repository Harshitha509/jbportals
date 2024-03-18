import pymysql
from app import app
from config import mysql
from flask import jsonify, flash, request, render_template


@app.route('/list/stocks', methods=['GET'])
def get_all_stocks():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM StockInfo")
        data = cur.fetchall()
        cur.close()
        return jsonify(data)

    except Exception as e:
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/list/stocks/filter', methods=['GET'])
def get_stocks_by_name():
    try:
        stock_name = request.args.get('stockName', type=str)
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM StockInfo WHERE stockName LIKE %s", ('%' + stock_name + '%',))
        data = cur.fetchall()
        cur.close()
        return jsonify(data)

    except Exception as e:
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/list/stocks/date', methods=['GET'])
def get_stocks_by_date():
    try:
        month = request.args.get('selectedMonth', type=str)
        year = request.args.get('selectedYear', type=str)
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM StockInfo WHERE MONTH(buyDate) = %s AND YEAR(buyDate) = %s", (month, year))
        data = cur.fetchall()
        cur.close()
        return jsonify(data)

    except Exception as e:
        return jsonify({'error': 'Internal Server Error'}), 500
@app.errorhandler(404)
def showMessage(error=None):
    message = {
        'status': 404,
        'message': 'Record not found: ' + request.url,
    }
    respone = jsonify(message)
    respone.status_code = 404
    return respone
    
if __name__ == '__main__':
    app.run(debug=True)