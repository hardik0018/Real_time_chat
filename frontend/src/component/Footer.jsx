import { useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { RiVideoAiLine } from "react-icons/ri";
import { TbPhoneCall } from "react-icons/tb";
import { Link } from "react-router-dom";

const Footer = () => {
  const [curentActive, setCurentActive] = useState("Chat");
  return (
    <div>
      <div className="w-full">
        <section
          id="bottom-navigation"
          className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"
        >
          <section
            id="bottom-navigation"
            className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow"
          >
            <div id="tabs" className="flex justify-between">
              <button
                onClick={() => setCurentActive("Chat")}
                className={`w-full flex flex-col items-center text-center pt-2 pb-1 hover:text-blue-500 ${
                  curentActive == "Chat" ? "text-blue-600" : "text-black"
                }`}
              >
                <IoChatboxEllipsesOutline
                  size={25}
                  className="inline-block mb-1 "
                />
                <span className="  font-semibold">Chat</span>
              </button>
              <button
                onClick={() => setCurentActive("Status")}
                className={`w-full flex flex-col items-center text-center pt-2 pb-1 hover:text-blue-500 ${
                  curentActive == "Status" ? "text-blue-600" : "text-black"
                }`}
              >
                <RiVideoAiLine size={25} className="inline-block mb-1" />
                <span className="  font-semibold">Status</span>
              </button>
              <button
                onClick={() => setCurentActive("Calls")}
                className={`w-full flex flex-col items-center text-center pt-2 pb-1 hover:text-blue-500 ${
                  curentActive == "Calls" ? "text-blue-600" : "text-black"
                }`}
              >
                <TbPhoneCall size={25} className="inline-block mb-1" />
                <span className=" font-semibold">Calls</span>
              </button>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Footer;
