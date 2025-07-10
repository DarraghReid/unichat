import { useEffect, useState } from "react";
import api from "./api";

function ChannelMessages({ user, channel, onBack }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => { // Fetch messages when the component mounts or channel changes
    if (!channel?._id) return;

    api
      .get(`/api/channels/${channel._id}/messages`)
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load messages", err);
        setLoading(false);
      });
  }, [channel]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
        const res = await api.post(`/api/channels/${channel._id}/messages`, {
        sender: user._id,
        content: newMessage,
        });

        // Add the new message to the list
        setMessages((prev) => [...prev, res.data]);
        setNewMessage(""); // Clear input
    } catch (err) {
        console.error("Error sending message", err);
    }
  };


  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back to channels
      </button>

      <h2 className="text-2xl font-bold mb-2">{channel.name}</h2>
      <p className="text-gray-500 mb-6">{channel.description || "No description"}</p>

      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-600">No messages yet.</p>
      ) : (
        <ul className="space-y-3">
          {messages.map((msg) => (
            <li key={msg._id} className="border rounded p-3">
              <div className="font-semibold">{msg.sender?.name || "Unknown"}</div>
              <div className="text-gray-700">{msg.content}</div>
              <div className="text-xs text-gray-400">
                {new Date(msg.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={sendMessage} className="mt-6 flex gap-2">
        <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow border border-gray-300 rounded px-4 py-2"
        />
        <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
            Send
        </button>
      </form>

    </div>
  );
}

export default ChannelMessages;
// This component fetches and displays messages for a specific channel.