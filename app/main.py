from flask import Flask, request, jsonify, session
from flask_session import Session
from sql import load_messages, insert_message
from tempfile import mkdtemp
from api import reply
from dotenv import load_dotenv
load_dotenv()
import os
import openai
from sum_img import summarize

# openai.api_key = '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'
openai.api_key = os.environ.get('open_ai_key')

app = Flask(__name__)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route('/login/', methods=['POST'])
def login():
    session.clear()
    session['text'] = ''
    session['naive'] = "No"
    email = request.get_json()['email']
    session['email'] = email
    
    response = {
        # Add this option to distinct the POST request
        'email': email,
        "METHOD": "POST"
    }
    return jsonify(response)


@app.route('/messagetype/', methods=['POST'])
def messagetype():
    naive = request.get_json()['naive']
    session['naive'] = naive
    response = {
        # Add this option to distinct the POST request
        'naive': naive,
        "METHOD": "POST"
    }
    return jsonify(response)


@app.route('/message/', methods=['POST'])
def message():
    if session.get('email') is not None:
        email = session['email']
        input_message = request.get_json()['message']
        big_string = ''
        if session['naive'] != "Yes":
            user_data = load_messages(email)

            for i in range(len(user_data)):
                cur_tuple = user_data[i]
                big_string += cur_tuple[0]
                big_string += '\n--\n'
        
        big_string += f'Input:{input_message}\nResponse:'
        response = reply(big_string).replace('Thank you for your response!', '').replace("\n", "").replace('--', '').strip()
        new_message = f'Input: {input_message}\nResponse:{response}'
        session['text'] += new_message + '\n'
        try:
            insert_message(email, new_message)
        except:
            pass

        new_response = {
            # Add this option to distinct the POST request
            'response': response
        }
        return jsonify(new_response)
    else:
        return jsonify({
            "ERROR": "No email found. Please login."
        })


@app.route('/image/', methods=['GET'])
def image():
    print("*********", session['text'], "*********")
    if session.get('text'):
        # session['text'] = f'''Input: My best friend stopped talking to me a few days ago and I am panicking
        #                     Response: First take a deep breath, and then maybe once you're feeling better, try your best to talk over your problems with your friend
        #                     -- 
        #                     Input: I am feeling good today for a change!
        #                     Response: That's awesome, I'm glad to know your feeling better about yourself!
        #                     --
        #                     Input: I want to actually go out today and enjoy myself
        #                     Response: I completely think you should. It'd be helpful to take a breath of fresh air and enjoy nature'''

        text = session['text'].replace('--', '').replace('Input: ', '').replace('Response:', '')
        text += f'\n\nSummary:'
        print("*********", text, "*********")
        prompt = summarize(text)
        print("*********", prompt, "*********")
        response = openai.Image.create(
            prompt=prompt,
            n=1,
            size="1024x1024"
        )
        image_url = response['data'][0]['url']
        return image_url
    return jsonify({"response": "Not text"})


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)


{"message": "I want to make friends. Please help"}
{"message": "I am so lonely"}
{"email": "varun@email.com"}
{"naive": "No"}