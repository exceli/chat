<template>
    <div className="messages-history">
        <label htmlFor="chatLog">Room: #{{ room.name }}</label>
        <div id="chatLog">
            <ChatMessage v-for="message in messages" :key="message.id" :message="message"/>
        </div>
    </div>
</template>

<script>
import ChatMessage from "./ChatMessage.vue";

export default {
    components: {
        ChatMessage
    },
    props: {
        room: {
            type: Object,
            required: true
        },
        value: {
            type: String,
            default: ''
        }
    },
    computed: {
        messages() {
            const lines = this.value.split('\n');
            return lines.map((line, index) => ({
                id: index,
                content: line.trim()
            }));
        }
    }
};
</script>

<style scoped>
</style>
