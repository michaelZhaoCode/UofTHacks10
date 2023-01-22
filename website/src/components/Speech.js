import React, { useState } from 'react';
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit';


function Speech() {
    const [value, setValue] = useState('');
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setValue(result);
            //   console.log(result);
        },
    });

    const styles = {
        color: 'red',
        width: 50,
        height: 50,
    }

    const { speak } = useSpeechSynthesis(); 

    // send the user's speech (converted to text) to the backend
    const postSpeech = async () => {
        try {
          const body = { value }; // convert to JSON since body needs to be in JSON format
          const response = await fetch('http://127.0.0.1:5000/message/', {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
          console.log(response);
          console.log('this should be the speech: ', value)
          setValue('');
          return response.response;

        } catch (error) {
          console.log(error);
        }
      }

    return (
        <div>
            <textarea
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <button onClick={listen}>
                🎤
            </button>
            {/* STOP BUTTON */}
            <button onClick={() => {
                stop();

                postSpeech().then((reply) => {
                    console.log("wow")
                    speak({text : reply})
                });
                console.log('this should be empty:', value)

                
            }} style={styles}></button>
            {listening && <div>Go ahead I'm listening</div>}
        </div>
    );
}

export default Speech;
