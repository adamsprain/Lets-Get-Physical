# importing required libraries
import mysql.connector
 
dataBase = mysql.connector.connect(
  host ="gymbros-db.chhat2qyenr4.us-east-2.rds.amazonaws.com",
  user ="gymbros",
  port = 3306,
  db = "gymbros-db",
  passwd ="myxaiXaYf6GclNJwthkH"
)
 
# preparing a cursor object
cursor = dataBase.cursor()
 
# A method to create a table for users credentials
def createUsersCredentialsTable():
    query = """
        CREATE TABLE IF NOT EXISTS users (
            email VARCHAR(100) NOT NULL PRIMARY KEY, 
            password TEXT NOT NULL
        )
        """
    cursor.execute(query)

#A method to delete users table
def deleteUsersTable():
    query = "DROP TABLE users"
    cursor.execute(query) 

#A method to add a user to users table
def createUsers(inputEmail, password):
    query = """
        INSERT INTO users(email, password)
        VALUES(%(email)s, %(password)s)
        """
    userInfo = {
        "email": inputEmail, 
        "password": password
    }
    cursor.execute(query, userInfo)

#A method to delete a user from users table
def deleteUsers(inputEmail):
    query = """
        DELETE FROM users
        WHERE email = %(email)s
        """
    userInfo = {
        "email": inputEmail
    }
    cursor.execute(query, userInfo)