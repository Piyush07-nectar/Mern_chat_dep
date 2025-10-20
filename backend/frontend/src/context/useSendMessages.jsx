import { useState } from "react";
import axios from "axios";
import useConversation from "../zusand/useConversation.js";
import { toast } from "react-toastify";

const useSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendmessage = async (message) => {
    if (!message.trim() || !selectedConversation?._id) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `/message/send/${selectedConversation._id}`,
        { message },
        { withCredentials: true }
      );

      // ✅ Extract the actual message object returned from backend
      const newMessage = response.data?.newMessage || response.data;

      // ✅ Instantly update UI
      setMessages([...messages, newMessage]);

      toast.success("Message sent ✅");
    } catch (err) {
      console.error("Send message error:", err);
      toast.error("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendmessage };
};

export default useSendMessages;
