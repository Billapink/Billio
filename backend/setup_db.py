import psycopg2
from app import get_db_connection

def create_tasks_table():

    conn= get_db_connection()
    cursor = conn.cursor()
    cursor.execute(" CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, description TEXT NOT NULL)")
    conn.commit()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    create_tasks_table()
