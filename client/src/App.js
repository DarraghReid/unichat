import './App.css';
import { useState } from "react";
import SelectUser from "./SelectUser";
import ChannelList from "./ChannelList";
import ChannelMessages from "./ChannelMessages";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);

  if (!currentUser) {
    return <SelectUser onUserSelect={setCurrentUser} />;
  }

  if (!selectedChannel) {
    return (
      <ChannelList
        user={currentUser}
        onChannelSelect={setSelectedChannel}
      />
    );
  }

  return (
    <ChannelMessages
      user={currentUser}
      channel={selectedChannel}
      onBack={() => setSelectedChannel(null)}
    />
  );
}

export default App;