import { useChatStore } from "../Store/UseChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeleton/MessageSkeleton";
import { useAuthStore } from "../Store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
function ChatContainer() {
  const {
    message,
    selectedUser,
    getMessages,
    isMessageLoading,
    isUserLoading,
    users,
  } = useChatStore();
  const { authuser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authuser._id ? "chat-start" : "chat-end"
            }`}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authuser._id
                      ? authuser.profileIMG || "/avtar.png"
                      : selectedUser.profileIMG || "/avtar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.img && (
                <img
                  src={message.img}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
