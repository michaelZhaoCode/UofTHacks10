import cohere
from cohere.classify import Example
co = cohere.Client('ZG1hp4UsOagPS7V8vOiSxkGMljolDMPi96KAvboq')
# use chatgpt to generate more training data

prompt = f"""  
Given a user input and the classification, the program will return an appropriate message.

Input: I want someone to talk to
Classification: neutral
Response: I am always here to listen to your worries!
--  
Input: I am having friendship troubles
Classification: neutral
Response: Could you please describe your problem a bit more? 
--  
Input: I am feeling useless
Classification: negative
Response: As I have gotten to know you, I can guarantee you that you are important and unique
--  
Input: My best friend stopped talking to me a few days ago and I am panicking
Classification: negative
Response: First take a deep breath, and then maybe once you're feeling better, try your best to talk over your problems with your friend
-- 
Input: I am feeling good today for a change!
Classification: positive
Response: That's awesome, I'm glad to know your feeling better about yourself!
--
Input: I want to actually go out today and enjoy myself
Classification: positive
Response: I completely think you should. It'd be helpful to take a breath of fresh air and enjoy nature
--
Input: I want to stop being so sad. Please help
Classification: negative
Response:
"""
response = co.generate(
  model='xlarge',
  prompt=prompt,
  max_tokens=40,
  temperature=0.8,
  stop_sequences=["--"],
  return_likelihoods='NONE')
print('Prediction: {}'.format(response.generations[0].text))

# examples = [
#     Example("I am very depressed today", "negative"),
#     Example("I am not happy", "negative"),
#     Example("I am anxious", "negative"),
#     Example("I am feeling fine today", "neutral"),
#     Example("I am feeling good", "positive"),
#     Example("I could be doing better", "neutral"),
#     Example("I am doing fine", "neutral"),
#     Example("I am lonely", "negative"),
#     Example("I am amazing", "positive"),
#     Example("Thank you", "positive"),
#     Example("I need help", "neutral"),
#     Example("I can do better", "neutral"),
#     Example("I am motivated to do better", "positive"), 
#     Example("I don't know what I am doing wrong", "negative"),
# ]

# inputs=[
#   'I am not feeling good at all'
# ]

# response = co.classify(  
#     model='large',  
#     inputs=inputs,  
#     examples=examples)

# print(response.classifications)
