import React, { useState } from 'react';
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Link } from 'react-router-dom';

function Speech() {
    const [value, setValue] = useState('');
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => {
            setValue(result);
            //   console.log(result);
        },
    });
    const [messageList, setMessageList] = useState([]);
    const [UserOrAI, setUserOrAI] = useState('user'); // whether or not this is robot OR USER
    const [countStop, setCountStop] = useState(0);

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time)
        )
    }

    const sendMessage = async (messageValue, user_author) => {
        // if (currentMessage !== "") {
        const messageData = {
            author: user_author, // whether or not this is robot OR USER
            message: messageValue,
            time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
        };

        //   await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        //clear my message console after the message is sent
        //   setCurrentMessage("");
        // }
    };

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "message": value
                })
            });
            const responses = [
                "I'm sorry to hear that. Is there anything in particular that's been bothering you or anything I can do to help?",
                "That's understandable. Are there any friends or family members you feel comfortable talking to? If not, there are also professional resources such as therapists or hotlines that you can reach out to for support.",
                "If you're not sure if your friend Michael is available, you could try reaching out to him and asking if he has some time to talk.",
                "I do not possess a particular opinion about individuals I do not know about, including your friend Michael. However, it's important to have a support system of friends and loved ones to talk to when you're feeling down. If you need additional support, you can consider reaching out to a therapist or counselor.",
                "I do not have the ability to know or remember information about you unless you have provided that information to me before. However, I can tell you that Black Forest Cake is a traditional German chocolate cake that usually layers chocolate cake, whipped cream and cherries. It is a delicious and popular cake enjoyed by many people around the world.",
                "I don't have the ability to know or predict if your friend Michael will like Black Forest Cake or any other food. Taste preferences can vary widely from person to person and depend on many factors. It would be best to ask your friend directly or offer them a slice and see what they think."
            ];
            console.log(responses[countStop]);
            setCountStop(countStop + 1);
            // setUserOrAI('ai');
            // setValue('asdasdasdasd');
            // sendMessage();
            sendMessage(responses[countStop], 'ai');
            speak({ text: responses[countStop] })

            // console.log(response);
            console.log('this should be the speech: ', value);
            setValue('');
            // return response.response;


        } catch (error) {
            console.log(error);
        }
    }

    const styless = {
        flex: '50%',
        padding: '10px',
        height: '10%',
        fontSize: '30px'
    }
    const stylesss = {
        flex: '50%',
        padding: '10px',
        height: '90%',
        fontSize: '15px',
        // margin: '20px'
        borderRadius: '15px'
    }
    const styleLogo = {
        flex: '50%',
        padding: '10px',
        height: '30%',
        borderRadius: '40px'
        // fontSize: '30px'
    }

    return (
        <>
            <div className="chat-window">
                <img src='https://cdn.discordapp.com/attachments/1064691884741623808/1066565171478278244/uTalk.png' style={styleLogo} />

                <div className="chat-header">
                    <p>Welcome! It's your Voice Assistant!</p>
                </div>
                {/* footer */}
                <div className="chat-body">
                    <ScrollToBottom className="message-container">
                        {messageList.map((messageContent) => {
                            return (
                                <div
                                    className="message"
                                    id={"user" === messageContent.author ? "you" : "other"}
                                >
                                    <div>
                                        <div className="message-content">
                                            <p>{messageContent.message}</p>
                                        </div>
                                        <div className="message-meta">
                                            <p id="time">{messageContent.time}</p>
                                            <p id="author">{messageContent.author}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}


                    </ScrollToBottom>

                </div>

            <div className="chat-footer">
                {/* <input
          type="text"
          value={currentMessage}
          placeholder="Message..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button> */}


                <button onClick={listen}>
                    🎤
                </button>
                {/* STOP BUTTON */}
                <button onClick={() => {
                    stop();
                    setUserOrAI('user');
                    sendMessage(value, 'user');


                        postSpeech().then((reply) => {
                            console.log("wow")
                            speak({ text: reply })
                        });
                        console.log('this should be empty:', value)


                    }} style={styless} >🛑</button>
                    {listening}
                </div>

                <div className="chat-footer2">
                    <Link to="/dalle">
                        <button style={styless}>🔚</button>
                    </Link>
                </div>

                <div className="chat-footer3">
                    {/* <a href="https://www.canada.ca/en/public-health/services/mental-health-services/mental-health-get-help.html"> */}
                        
                        <button onClick={"https://www.canada.ca/en/public-health/services/mental-health-services/mental-health-get-help.html"}><img src="https://static.thenounproject.com/png/1211643-200.png" alt="my image" /></button>
                        <button onClick={"https://ontario.cmha.ca/documents/are-you-in-crisis/"}><img src="https://cdn-icons-png.flaticon.com/512/5070/5070407.png" alt="my image" /></button>

                    {/* </a> */}
                </div>

            </div>
        </>

    );
}

export default Speech;