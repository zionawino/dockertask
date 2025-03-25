const SAD_EMOJI = [0x1F641];      // ☹️
const HAPPY_EMOJI = [0x1F600];    // 😀
const NEUTRAL_EMOJI = [0x1F610];  // 😐

new Vue({
    el: '#app',
    data: {
        username: '',
        chats: [] // Ensure chats array exists
    },
    created() {
        let pusher = new Pusher('ab4e4deca7b0f598ba3b', { // Replace with actual API key
            cluster: 'eu', // Replace with actual cluster
            encrypted: true
        });

        const channel = pusher.subscribe('chats');
        channel.bind('new-chat', (data) => {
            const expression = data.sentiment > 0 ? HAPPY_EMOJI :
                               (data.sentiment === 0 ? NEUTRAL_EMOJI : SAD_EMOJI);

            const response = {
                message: data.message,
                user: data.user,
                mood: String.fromCodePoint(...expression)
            };

            this.chats.push(response);
        });
    },
    methods: {
        getUser(event) {
            this.username = event.target.value;
        },
        postMessages(event) {
            if (!this.username) {
                alert('Enter a username first!');
                return;
            }

            const message = event.target.value.trim();
            if (!message) return;

            axios.post('/message', {
                user: this.username,
                message: message
            })
            .then(() => {
                event.target.value = ''; // Clear input after sending
            })
            .catch(error => {
                console.error('Message sending failed:', error);
            });
        }
    }
});
