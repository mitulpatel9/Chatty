import React, { useEffect } from "react";
import { useChatStore } from "../Store/UseChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeleton/MessageSkeleton";

function ChatContainer() {
  const {
    message,
    selectedUser,
    getMessages,
    isMessageLoading,
    isUserLoading,
    users,
  } = useChatStore();

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
    <>
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageInput />
      </div>
    </>
  );
}

export default ChatContainer;
