<template>
  <div class="chat-app">
    <div class="sidebar">
      <ChatList @chat-selected="selectChat" :chats="chats" />
    </div>
    <div class="chat-window">
      <h1 v-if="selectedChat">{{ selectedChat.name }}</h1>
      <ChatMessages v-if="selectedChat" :messages="selectedChat.messages" />
      <ChatInput v-if="selectedChat" @message-sent="sendMessage" />
    </div>
  </div>
</template>

<script>
import ChatList from './components/ChatList.vue';
import ChatMessages from './components/ChatMessages.vue';
import ChatInput from './components/ChatInput.vue';

export default {
  components: {
    ChatList,
    ChatMessages,
    ChatInput
  },
  data() {
    return {
      chats: [
        { id: 1, name: 'Chat 1', messages: [] },
        { id: 2, name: 'Chat 2', messages: [] },
        { id: 3, name: 'Chat 3', messages: [] },
        // Дополнительные чаты
        { id: 4, name: 'Chat 4', messages: [] },
        { id: 5, name: 'Chat 5', messages: [] }
      ],
      selectedChat: null
    };
  },
  methods: {
    selectChat(chat) {
      this.selectedChat = chat;
    },
    sendMessage(message) {
      if (this.selectedChat) {
        this.selectedChat.messages.push(message);
      }
    }
  }
};
</script>