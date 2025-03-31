import psycopg2
from app import get_db_connection

def create_tasks_table():

    conn= get_db_connection()
    cursor = conn.cursor()
    cursor.execute(" CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, description TEXT NOT NULL)")
    conn.commit()
    cursor.close()
    conn.close()

def create_users_table():

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS Users (id SERIAL PRIMARY KEY, Username TEXT NOT NULL, Password TEXT NOT NULL)")
    conn.commit()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    create_tasks_table()
    create_users_table()
