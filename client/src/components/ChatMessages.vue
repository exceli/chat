<template>
  <div class="chat-messages">
    <div v-for="message in messages" :key="message.id" class="message">
      <div class="message-sender">{{ message.sender }}</div>
      <div class="message-text">{{ message.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['messages']
};
</script>

<style scoped>
.chat-messages .message {
  margin-bottom: 10px;
}

.message-sender {
  font-weight: bold;
}

.message-text {
  margin-top: 5px;
}
</style>