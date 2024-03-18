from app import app
from flaskext.mysql import mysql
mysql=mysql()
app.config['MYSQL_DATABASE_USER']='root'
app.config['MYSQL_DATABASE_PASSWORD']='Student123!'
app.config['MYSQL_DATABASE_DB']='clg'
app.config['MYSQL_DATABASE_HOST']='localost'
mysql.init_app(app)