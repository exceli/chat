<template>
  <div class="chat-message">
    <div v-if="isPrivateMessage" class="private-message">
      <span class="sender">{{ message.user }}</span> (Private): {{ message.content }}
    </div>
    <div v-else class="public-message">
      <span class="sender">{{ message.user }}</span> {{ message.content }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    isPrivateMessage() {
      return this.message.type === 'private_message';
    }
  }
};
</script>

<style scoped>
.public-message {
    margin: 0 49px 0 86px;
}
</style>
