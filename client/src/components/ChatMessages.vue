<template>
  <div class="messages">
    <div class="messages-container">
      <div class="messages-history">
        <label for="chatLog">Room: #{{ room.name }}</label>
        <textarea rows="10" class="form-control" id="chatLog" readonly v-model="chatLogContent"></textarea>
      </div>
      <div class="messages-input-group">
        <input type="text" class="form-control" id="chatMessageInput" placeholder="Enter your chat message" v-model="message">
        <div class="input-group-append">
          <button class="btn btn-success" id="chatMessageSend" type="button" @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
    <div>
      <label for="onlineUsers">Online users</label>
      <select multiple class="form-control" id="onlineUsersSelector" v-model="selectedUser">
        <option v-for="user in onlineUsers" :value="user" :key="user">{{ user }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chatLogContent: '',
      message: '',
      onlineUsers: [],
      selectedUser: [],
      chatSocket: null
    };
  },
  mounted() {
    this.connectWebSocket();
  },
  methods: {
    connectWebSocket() {
      const roomName = this.room.name;
      this.chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

      this.chatSocket.onopen = () => {
        console.log("Successfully connected to the WebSocket.");
      };

      this.chatSocket.onclose = () => {
        console.log("WebSocket connection closed unexpectedly. Trying to reconnect in 2s...");
        setTimeout(() => {
          console.log("Reconnecting...");
          this.connectWebSocket();
        }, 2000);
      };

      this.chatSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);

        switch (data.type) {
          case "user_list":
            this.onlineUsers = data.users;
            break;
          case "user_join":
            this.chatLogContent += data.user + " joined the room.\n";
            this.onlineUsers.push(data.user);
            break;
          case "user_leave":
            this.chatLogContent += data.user + " left the room.\n";
            this.onlineUsers = this.onlineUsers.filter(user => user !== data.user);
            break;
          case "chat_message":
            this.chatLogContent += data.user + ": " + data.message + "\n";
            break;
          case "private_message":
            this.chatLogContent += "PM from " + data.user + ": " + data.message + "\n";
            break;
          case "private_message_delivered":
            this.chatLogContent += "PM to " + data.target + ": " + data.message + "\n";
            break;
          case "chat_messages":
            this.chatLogContent = data.messages
              .reverse()
              .map(message => message.user + ": " + message.content)
              .join("\n");
            break;
          default:
            console.error("Unknown message type!");
            break;
        }

        this.$nextTick(() => {
          const chatLog = document.getElementById('chatLog');
          chatLog.scrollTop = chatLog.scrollHeight;
        });
      };

      this.chatSocket.onerror = (err) => {
        console.log("WebSocket encountered an error: " + err.message);
        console.log("Closing the socket.");
        this.chatSocket.close();
      };
    },
    sendMessage() {
      if (this.message.length === 0) return;
      console.log(this.message);
      this.chatSocket.send(JSON.stringify({
        type: 'chat_message',
        user: this.message.user,
        message: this.message,
      }));
      this.message = '';
      console.log(this.message)
    }
  }
};
</script>

<style>
.messages {
  display: flex;
}

.messages-history {
  display: flex;
  flex-direction: column;
}

.messages-input-group {
  display: flex;
}
</style>
