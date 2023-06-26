<template>
  <div class="chat-list">
    <ul class="chat-list__list">
      <li v-for="room in rooms" :key="room.id" @click="selectRoom(room)">
        {{ room.name }} ({{ room.online[0] }})
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
          console.log(response.data);
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
.chat-list {
    border-right: 1px solid white;
}
</style>
