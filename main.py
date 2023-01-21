from flask import Flask, request, jsonify
from sql import *

app = Flask(__name__)


@app.route('/login/', methods=['POST'])
def login():
    email = request.get_json()['email']
    messages = load_messages(email)
    print(email)
    # TODO: give messages to someone
    response = {
        # Add this option to distinct the POST request
        'email': email,
        "METHOD": "POST"
    }
    return jsonify(response)


@app.route('/newmessage/', methods=['POST'])
def add_record():
    email = request.get_json()['email']
    message = request.get_json()['message']
    insert_message(email, message)

    response = {
        # Add this option to distinct the POST request
        'email': email,
        'message': message,
        "METHOD": "POST"
    }
    return jsonify(response)



@app.route('/')
def index():
    # A welcome message to test our server
    return "<h1>Welcome to our medium-greeting-api!</h1>"


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
