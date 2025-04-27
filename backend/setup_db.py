import psycopg2
from app import get_db_connection

def create_users_table():

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Users (
            id SERIAL PRIMARY KEY, 
            Username TEXT NOT NULL, 
            Password TEXT NOT NULL,
            Bio TEXT,
            Icon TEXT 
    )""")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS FriendRequests (
            id SERIAL PRIMARY KEY, 
            UserId INT4 NOT NULL REFERENCES Users ON DELETE CASCADE,
            FriendId INT4 NOT NULL REFERENCES Users ON DELETE CASCADE,
            Status TEXT NOT NULL
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Friends (
            id SERIAL PRIMARY KEY, 
            UserId INT4 NOT NULL REFERENCES Users ON DELETE CASCADE,
            FriendId INT4 NOT NULL REFERENCES Users ON DELETE CASCADE
        )
    """)
    cursor.execute('CREATE EXTENSION IF NOT EXISTS pg_trgm')
    conn.commit()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    create_users_table()
