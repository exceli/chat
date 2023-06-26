<template>
  <div class="messages">
    <div class="messages-container">
      <div class="messages-history">
        <label for="chatLog">Room: #{{ room.name }}</label>
        <textarea rows="10" class="form-control" id="chatLog" readonly></textarea>
      </div>
      <div>
        <input type="text" class="form-control" id="chatMessageInput" placeholder="Enter your chat message">
        <div class="input-group-append">
            <button class="btn btn-success" id="chatMessageSend" type="button">Send</button>
        </div>
      </div>
    </div>
    <div>
      <label for="onlineUsers">Online users</label>
      <select multiple class="form-control" id="onlineUsersSelector"></select>
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
      message: ''
    }
  },
  mounted() {
    this.connectWebSocket();
  },
  methods: {
    connectWebSocket() {
      const chatLog = document.getElementById('chatLog');
      const roomName = this.room.name;
      const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

      chatSocket.onopen = function (e) {
        console.log("Successfully connected to the WebSocket.");
      };

      chatSocket.onclose = function (e) {
        console.log("WebSocket connection closed unexpectedly. Trying to reconnect in 2s...");
        setTimeout(function () {
          console.log("Reconnecting...");
          connect();
        }, 2000);
      };

      chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        console.log(data);

        switch (data.type) {
          case "chat_message":
            chatLog.value += data.user + ": " + data.message + "\n";
            break;
          case "private_message":
            chatLog.value += "PM from " + data.user + ": " + data.message + "\n";
            console.log(chatLog.value);
            break;
          case "private_message_delivered":
            chatLog.value += "PM to " + data.target + ": " + data.message + "\n";
            break;
          case "chat_messages":
            chatLog.value = "";

            for (let i = data.messages.length - 1; 0 <= i; i--) {
              const message = data.messages[i];
              chatLog.value += message.user + ": " + message.content + "\n";
            }
            break;
          default:
            console.error("Unknown message type!");
            break;
        }
        chatLog.scrollTop = chatLog.scrollHeight;
      };

      chatSocket.onerror = function (err) {
        console.log("WebSocket encountered an error: " + err.message);
        console.log("Closing the socket.");
        chatSocket.close();
      };

      this.chatSocket = chatSocket;
    },
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
</style>
