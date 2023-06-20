<template>
  <div class="chat-list">
    <div v-for="chat in chats" :key="chat.id" @click="selectChat(chat)" :class="{ active: chat === selectedChat }">
      {{ chat.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['chats', 'selectedChat'],
  methods: {
    selectChat(chat) {
      this.$emit('chat-selected', chat);
    }
  }
};
</script>

<style scoped>
.chat-list div {
  padding: 10px;
  cursor: pointer;
}

.chat-list div.active {
  background-color: #ccc;
}
</style>