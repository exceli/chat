<template>
    <div className="messages-history">
        <div class="message-title">
            <span htmlFor="chatLog">{{ room.name }}</span>
        </div>
        <div id="chatLog" class="chat-body">
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
.message-title {
    padding: 15px;
    height: 63px;
    border-bottom: 1px solid #424242;
}

.chat-body {
    padding: ;
}
</style>
