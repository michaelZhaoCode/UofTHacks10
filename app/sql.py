import sqlite3

def create_messages_table():
    """Initialize message table"""
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, user nvarchar(100), message nvarchar(100))"
    mycursor.execute(command)
    conn.commit()


def insert_message(user: str, message:str):
    """Insert new message into messages"""
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"INSERT INTO messages (user, message) VALUES ('{user}', '{message}')"
    mycursor.execute(command)
    conn.commit()


def load_messages(user: str) -> list[tuple]:
    """Returns a list of current medications for specified user"""
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"""SELECT message FROM messages WHERE user = '{user}'"""
    mycursor.execute(command)

    return mycursor.fetchall()


def remove_user(user: str):
    """Remove all messages from user"""
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"DELETE FROM messages WHERE user = '{user}'"
    mycursor.execute(command)
    conn.commit()


def remove_message(user: str, message: str):
    """Remove message from user"""
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"DELETE FROM messages WHERE user = '{user}' AND message = '{message}'"
    mycursor.execute(command)
    conn.commit()


def remove_specific(message_id: int):
    """Remove particular message from user"""
    conn = sqlite3.connect("mydatabase.db")
    mycursor = conn.cursor()

    command = f"DELETE FROM messages WHERE id = {message_id}"
    mycursor.execute(command)
    conn.commit()


# conn = sqlite3.connect("mydatabase.db")
# mycursor = conn.cursor()
#
# mycursor.execute('SELECT * FROM messages')
# print(mycursor.fetchall())
