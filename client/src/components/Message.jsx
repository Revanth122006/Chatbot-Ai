import ReactMarkdown from "react-markdown";

import { motion } from "framer-motion";

import {

Prism as SyntaxHighlighter

}

from

"react-syntax-highlighter";

import {

oneDark

}

from

"react-syntax-highlighter/dist/esm/styles/prism";

function Message({

message

}) {

return (

<motion.div

initial={{

opacity:0,

y:10

}}

animate={{

opacity:1,

y:0

}}

transition={{

duration:0.3

}}

className={

message.role==="user"

?

"user-message"

:

"ai-message"

}

>

<div className="avatar">

{

message.role==="user"

?

"👤"

:

"🤖"

}

</div>

<div className="message-content">

<ReactMarkdown

components={{

code({

inline,

className,

children,

...props

}) {

const match =

/language-(\w+)/

.exec(

className||''

);

return !inline && match ? (

<SyntaxHighlighter

style={oneDark}

language={match[1]}

PreTag="div"

{...props}

>

{

String(

children

).replace(

/\n$/,''

)

}

</SyntaxHighlighter>

)

:

(

<code

className={className}

{...props}

>

{children}

</code>

);

}

}}

>

{

message.content

}

</ReactMarkdown>

</div>

</motion.div>

);

}

export default Message;