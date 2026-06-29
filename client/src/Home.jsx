import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";

import "./App.css";

function Home(){

const [chatHistory,setChatHistory]=useState(

JSON.parse(

localStorage.getItem(

"robustai"

)

)||[]

);

const [activeChat,setActiveChat]=useState(

chatHistory.length>0

?

chatHistory[0].id

:

null

);

const [message,setMessage]=useState("");

const [loading,setLoading]=useState(false);

const [image,setImage]=useState(null);

const [darkMode,setDarkMode]=useState(true);

useEffect(()=>{

localStorage.setItem(

"robustai",

JSON.stringify(

chatHistory

)

);

},[chatHistory]);

const currentChat=

chatHistory.find(

chat=>

chat.id===activeChat

);

const messages=

currentChat

?

currentChat.messages

:

[];

const setMessages=(newMessages)=>{

setChatHistory(prev=>

prev.map(chat=>

chat.id===activeChat

?

{

...chat,

messages:

typeof newMessages==="function"

?

newMessages(

chat.messages

)

:

newMessages

}

:

chat

)

);

};

return(

<div className={

darkMode

?

"app dark"

:

"app light"

}>

<Sidebar

chatHistory={chatHistory}

setChatHistory={setChatHistory}

activeChat={activeChat}

setActiveChat={setActiveChat}

/>

<div className="main">

<ChatWindow

messages={messages}

loading={loading}

image={image}

/>

<InputBar

message={message}

setMessage={setMessage}

messages={messages}

setMessages={setMessages}

setLoading={setLoading}

setImage={setImage}

darkMode={darkMode}

setDarkMode={setDarkMode}

chatHistory={chatHistory}

setChatHistory={setChatHistory}

activeChat={activeChat}

/>

</div>

</div>

);

}

export default Home;