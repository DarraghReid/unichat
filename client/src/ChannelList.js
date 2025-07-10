import { useEffect, useState } from "react";
import api from "./api";

function ChannelList({ user, onChannelSelect }) {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { // Fetch channels when the component mounts or user changes
    if (!user) return;

    api
      .get(`/api/channels?userId=${user._id}`)
      .then((res) => {
        setChannels(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch channels", err);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10">Loading channels...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Your Channels</h2>
      {channels.length === 0 ? (
        <p className="text-gray-600">You're not in any channels yet.</p>
      ) : (
        <ul className="space-y-4">
          {channels.map((channel) => (
            <li
              key={channel._id}
              className="p-4 border rounded hover:bg-blue-50 cursor-pointer"
              onClick={() => onChannelSelect(channel)} // ← updated
            >
              <h3 className="text-lg font-semibold">{channel.name}</h3>
              <p className="text-sm text-gray-500">
                {channel.description || "No description"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ChannelList;
// This component fetches and displays a list of channels the user is part of.