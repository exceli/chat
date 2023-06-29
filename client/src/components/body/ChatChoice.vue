<template>
  <div class="container mt-3 p-5">
    <h2>Vk killer</h2>
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="mb-2">
          <label for="roomInput">Enter a room name to connect to it:</label>
          <input type="text" class="form-control" id="roomInput" placeholder="Room name" v-model="roomName">
          <small id="roomInputHelp" class="form-text text-muted">If the room doesn't exist yet, it will be created for you.</small>
        </div>
        <button type="button" class="btn btn-success" @click="connectToRoom">Connect</button>
      </div>
      <div class="col-12 col-md-4">
        <label for="roomSelect">Active rooms</label>
        <select multiple class="form-control" id="roomSelect">
          <option v-for="room in rooms" :key="room">{{ room }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [],
      roomName: ''
    };
  },
  mounted() {
    fetch('http://localhost:8000/chat')
      .then(response => response.json())
      .then(data => {
        this.rooms = data.rooms;
      })
      .catch(error => {
        console.error('Failed to fetch rooms:', error);
      });
  },
  methods: {
    connectToRoom() {
      const roomName = this.roomName.trim();
      if (roomName) {
        const roomPath = "chat/" + roomName + "/";
        window.location.pathname = roomPath;
      }
    }
  }
};
</script>

<style>
#roomSelect {
  height: 300px;
}
</style>
