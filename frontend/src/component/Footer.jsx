import { useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { RiVideoAiLine } from "react-icons/ri";
import { TbPhoneCall } from "react-icons/tb";

const Footer = () => {
  const [curentActive, setCurentActive] = useState("Chat");
  return (
    <div>
      <div className="btm-nav">
        <button
          onClick={() => setCurentActive("Chat")}
          className={`${curentActive == "Chat" ? "active" : ""} `}
        >
          <IoChatboxEllipsesOutline />
          <span className="btm-nav-label">Chat</span>
        </button>
        <button
          onClick={() => setCurentActive("Status")}
          className={`${curentActive == "Status" ? "active" : ""}`}
        >
          <RiVideoAiLine />
          <span className="btm-nav-label">Status</span>
        </button>
        <button
          onClick={() => setCurentActive("Calls")}
          className={`${curentActive == "Calls" ? "active" : ""}`}
        >
          <TbPhoneCall />
          <span className="btm-nav-label">Calls</span>
        </button>
      </div>
    </div>
  );
};

export default Footer;
