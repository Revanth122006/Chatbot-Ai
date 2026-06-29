import axios from "axios";

function InputBar({

message,

setMessage,

messages,

setMessages,

setLoading,

setImage,

darkMode,

setDarkMode,

setChatHistory,

activeChat

}) {

const sendMessage = async () => {

if (!message.trim()) return;

/* Rename chat automatically */

if (

messages.length === 0 &&

activeChat

) {

setChatHistory(prev =>

prev.map(chat =>

chat.id === activeChat

? {

...chat,

title:

message

.split(" ")

.slice(0, 5)

.join(" ")

}

: chat

)

);

}

const userMessage = {

role: "user",

content: message

};

setMessages(prev => [

...prev,

userMessage

]);

const currentMessage = message;

setMessage("");

setLoading(true);

try {

const res = await axios.post(

"http://localhost:5000/api/chat",

{

message: currentMessage

}

);

const aiMessage = {

role: "assistant",

content: res.data.reply

};

setMessages(prev => [

...prev,

aiMessage

]);

}

catch {

setMessages(prev => [

...prev,

{

role: "assistant",

content:

"Sorry, something went wrong."

}

]);

}

finally {

setLoading(false);

}

};

return (

<div className="input-bar">

<button

onClick={() =>

setDarkMode(

!darkMode

)

}

>

{

darkMode

?

"☀️"

:

"🌙"

}

</button>

<input

type="text"

placeholder="Ask anything..."

value={message}

onChange={(e)=>

setMessage(

e.target.value

)

}

onKeyDown={(e)=>{

if(e.key==="Enter"){

sendMessage();

}

}}

 />

<label>

📷

<input

hidden

type="file"

accept="image/*"

onChange={(e)=>

setImage(

e.target.files[0]

)

}

/>

</label>

<button>

🎤

</button>

<button

onClick={sendMessage}

>

➤

</button>

</div>

);

}

export default InputBar;