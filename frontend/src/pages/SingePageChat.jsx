import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useMessageStore } from "../store/useMessageStore";

const SingePageChat = () => {
  const [messagetext, setMessagetext] = useState();
  const { slug } = useParams();
  const {
    sendMessage,
    getMessage,
    message,
    suscribeToMessage,
    unsuscribeFromMessage,
  } = useMessageStore();

  const SendMessage = () => {
    sendMessage({ reciverId: slug, messagetext });
  };

  useEffect(() => {
    getMessage(slug);
    suscribeToMessage();
    return () => unsuscribeFromMessage();
  }, [slug, suscribeToMessage, unsuscribeFromMessage, getMessage]);
  return (
    <div>
      {message.map((item, i) => {
        return (
          <div
            key={i}
            className={`chat chat-${item.senderId == slug ? "start" : "end"}`}
          >
            <div className="chat-bubble">{item.messagetext}</div>
          </div>
        );
      })}

      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full max-w-xs"
        value={messagetext}
        onChange={(e) => setMessagetext(e.target.value)}
      />
      <button className="btn btn-primary" onClick={SendMessage}>
        Primary
      </button>
    </div>
  );
};

export default SingePageChat;
