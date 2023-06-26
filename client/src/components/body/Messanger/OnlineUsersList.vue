<template>
  <div>
    <label for="onlineUsers">Online users</label>
    <select multiple class="form-control" id="onlineUsersSelector" :value="selectedUser" @input="emitSelectedUser($event.target.value)">
      <option v-for="user in onlineUsers" :value="user" :key="user">{{ user }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    onlineUsers: {
      type: Array,
      required: true
    },
    selectedUser: {
      type: Array,
      required: true
    }
  },
  methods: {
    emitSelectedUser(value) {
      this.$emit('update:selectedUser', value);
    }
  }
};
</script>

<style scoped>
</style>
