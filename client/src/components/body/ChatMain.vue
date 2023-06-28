<template>
  <section class="main">
    <div class="container">
      <div class="main-container">
        <div class="left-block">
          <ChatList :rooms="rooms" @room-selected="openChatRoom" />
        </div>
        <div class="right-block">
          <div v-if="selectedRoom" class="chat-container">
            <ChatMessages :room="selectedRoom" :key="selectedRoom.name" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ChatList from './Messanger/ChatList.vue';
import ChatMessages from './Messanger/ChatMessages.vue';

export default {
  components: {
    ChatList,
    ChatMessages,
  },
  data() {
    return {
      rooms: [],
      selectedRoom: null
    };
  },
  methods: {
    openChatRoom(room) {
      this.selectedRoom = room;
    }
  }
};
</script>

<style scoped>
.main {
    margin-top: 15px;
}

.container {
  max-width: 100%;
  margin: auto;
  padding: 0 300px;
}

.main-container {
  display: flex;
  height: calc(100vh - 90px);
  background-color: #222222;
  border: 1px solid #424242;
  border-radius: 20px;
}

.left-block {
    width: 316px;
    border-right: 1px solid #424242;
}

.right-block {
    width: 100%;
}

.chat-container {
    height: 100%;
}
</style>
