import { FaPlus, FaTrash } from "react-icons/fa";

function Sidebar({

chatHistory,

setChatHistory,

activeChat,

setActiveChat

}) {

const createChat = () => {

const chat = {

id: Date.now(),

title: "New Chat",

messages: []

};

setChatHistory(

[chat,...chatHistory]

);

setActiveChat(

chat.id

);

};

const deleteChat=(e,id)=>{

e.stopPropagation();

const updated=

chatHistory.filter(

chat=>chat.id!==id

);

setChatHistory(

updated

);

if(activeChat===id){

setActiveChat(

updated.length

?

updated[0].id

:

null

);

}

};

return(

<div className="sidebar">

<div className="logo">

Robust AI

</div>

<button

className="new-chat"

onClick={createChat}

>

<FaPlus/>

New Chat

</button>

<div className="history">

{

chatHistory.map(chat=>(

<div

key={chat.id}

className={

activeChat===chat.id

?

"history-item active"

:

"history-item"

}

onClick={()=>

setActiveChat(

chat.id

)

}

>

<span>

{chat.title}

</span>

<button

className="delete-btn"

onClick={(e)=>

deleteChat(

e,

chat.id

)

}

>

<FaTrash/>

</button>

</div>

))

}

</div>

</div>

);

}

export default Sidebar;