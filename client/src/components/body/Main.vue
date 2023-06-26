<template>
  <div class="main">
    <div style="display: flex;">
      <ChatList :rooms="rooms" @room-selected="openChatRoom" />
      <div v-if="selectedRoom">
        <ChatMessages :room="selectedRoom" />
      </div>
    </div>
  </div>
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

<style>
.main {
    border-radius: 10px;
    background-color: #222222;
}
</style>
