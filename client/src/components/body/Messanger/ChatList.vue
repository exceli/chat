<template>
  <div class="chat-list">
    <ul class="list-reset">
      <li class="chat-dialog chat-item" v-for="room in rooms" :key="room.id" @click="selectRoom(room)">
        {{ room.name }} {{ room.online[0] }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rooms: []
    };
  },
  mounted() {
    this.fetchChatRooms();
  },
  methods: {
    fetchChatRooms() {
      axios.get("http://localhost:8000/chat/")
        .then(response => {
          this.rooms = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    selectRoom(room) {
      this.$emit('room-selected', room);
    }
  }
};
</script>

<style>
.chat-item {
    padding: 15px;
}

.chat-item:not(:last-child) {
    border-bottom: 1px solid #424242;
}

.chat-dialog {
    height: 63px;
    cursor: pointer;
}
</style>
