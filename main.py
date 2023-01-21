from flask import Flask, request, jsonify, session
from flask_session import Session
from sql import *
from tempfile import mkdtemp

app = Flask(__name__)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route('/login/', methods=['POST'])
def login():
    email = request.get_json()['email']
    session['email'] = email
    messages = load_messages(email)
    print(email)
    # TODO: give messages to someone
    response = {
        # Add this option to distinct the POST request
        'email': email,
        "METHOD": "POST"
    }
    return jsonify(response)


@app.route('/message/', methods=['POST'])
def message():
    if session.get('email') is not None:
        email = session['email']
        message = request.get_json()['message']
        insert_message(email, message)

        response = {
            # Add this option to distinct the POST request
            'email': email,
            'message': message,
            "METHOD": "POST"
        }
        return jsonify(response)
    else:
        return jsonify({
            "ERROR": "No email found. Please login."
        })



@app.route('/')
def index():
    # A welcome message to test our server
    return "<h1>Welcome to our medium-greeting-api!</h1>"


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
