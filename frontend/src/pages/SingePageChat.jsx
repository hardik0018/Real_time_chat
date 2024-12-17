import { Link, useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { IoMdLink } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSearch, IoSend } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";

const SingePageChat = () => {
  const [messagetext, setMessagetext] = useState("");
  const { slug } = useParams();
  const menuRef = useRef();
  const {
    sendMessage,
    getMessage,
    message,
    suscribeToMessage,
    unsuscribeFromMessage,
    isMessageLoading,
  } = useMessageStore();

  const SendMessage = () => {
    sendMessage({ reciverId: slug, messagetext });
  };

  const hanldeMenu = () => {
    if (menuRef.current.classList.contains("hidden")) {
      menuRef.current.classList.add("");
    } else {
      menuRef.current.classList.remove("");
    }
  };
  useEffect(() => {
    getMessage(slug);
    suscribeToMessage();
    return () => unsuscribeFromMessage();
  }, [slug, suscribeToMessage, unsuscribeFromMessage, getMessage]);

  if (isMessageLoading) return <div className="h-screen">Loading</div>;
  return (
    <div className="">
      <div class="right-upper sticky top-0 z-30 bg-[#9ac1d8] flex justify-between items-center px-2 py-[0.60rem]">
        <div class="flex justify-between items-center w-full cursor-pointer">
          <div class="flex justify-between items-center space-x-1">
            <img
              src="/images/Ravindra.jpg"
              class="w-[40px] h-[40px] rounded-full "
            />
            <div class="flex flex-col">
              <p class="text-slate-600 font-sans font-medium text-base">
                Ravindra
              </p>
              <p class="text-gray-100 font-sans font-medium text-[0.75rem]">
                Online
              </p>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="w-[40px] h-[40px] flex justify-end items-center ">
              <IoSearch size={18} />
            </div>
            <div class="w-[40px] h-[40px] flex justify-end items-center">
              <CiMenuKebab size={18} onClick={hanldeMenu} />
            </div>
          </div>
        </div>
        <div className="absolute right-1 top-16">
          <Menu />
        </div>
      </div>
      {message.map((item, i) => {
        return (
          <div
            key={i}
            className={`chat ${
              item.senderId == slug ? "chat-start" : "chat-end"
            }`}
          >
            <div className="chat-bubble">{item.messagetext}</div>
          </div>
        );
      })}

      <div class="right-bottom w-full sticky left-0 bottom-0 flex justify-between items-center px-4 py-4 space-x-2 bg-[#F0F2F5]">
        <div class="relative w-[92%]">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3">
            <BsEmojiSmile className="text-gray-700 cursor-pointer" />
          </div>
          <input
            id="search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write a message"
            value={messagetext}
            onChange={(e) => setMessagetext(e.target.value)}
          />
          <div class="absolute inset-y-0 end-2 flex items-center ps-3 space-x-3">
            <IoMdLink size={20} className="text-gray-700 cursor-pointer" />
            <MdOutlinePhotoCamera
              size={20}
              className="text-gray-700 cursor-pointer"
            />
          </div>
        </div>

        <div class="flex justify-center items-center w-[40px] h-[40px] cursor-pointer bg-blue-600 rounded-full p-2 text-white">
          {messagetext.length > 0 ? (
            <IoSend size={20} onClick={SendMessage} />
          ) : (
            <MdKeyboardVoice size={25} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingePageChat;

export const Menu = () => {
  return (
    <ul className="menu bg-base-200 w-40 p-0">
      <li>
        <Link to={"/"}>Item 1</Link>
      </li>
      <li>
        <Link to={"/"}>Item 2</Link>
      </li>
      <li>
        <Link to={"/"}>Item 3</Link>
      </li>
    </ul>
  );
};
