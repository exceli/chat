<template>
  <div class="chat-input">
    <input type="text" v-model="message" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    };
  },
  methods: {
    sendMessage() {
      if (this.message.trim() !== '') {
        this.$emit('message-sent', { text: this.message });
        this.message = '';
      }
    }
  }
};
</script>

<style scoped>
.chat-input input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.chat-input button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>