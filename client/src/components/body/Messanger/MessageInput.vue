<template>
  <div class="messages-input-group">
    <input type="text" class="form-control" id="chatMessageInput" placeholder="Enter your chat message" v-model="message">
    <div class="input-group-append">
      <button class="btn btn-success" id="chatMessageSend" type="button" @click="sendMessage">Send</button>
    </div>
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
      if (this.message.length === 0) return;
      this.$emit('send', this.message);
      this.message = '';
    }
  }
};
</script>

<style scoped>
.messages-input-group {
  display: flex;
}
</style>
