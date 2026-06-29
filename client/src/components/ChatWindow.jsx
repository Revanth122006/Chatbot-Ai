import Message from "./Message";

function ChatWindow({ messages, loading, image }) {

  return (

    <div className="chat-window">

      {messages.map((msg, index) => (

        <Message
          key={index}
          message={msg}
        />

      ))}

      {image && (

        <img
          src={URL.createObjectURL(image)}
          className="preview"
        />

      )}

      {loading && (

        <div className="typing">

          Thinking...

        </div>

      )}

    </div>

  );

}

export default ChatWindow;