Vue.component('chat-module', {
    props: ['roomId'],
    data: function() {
        return {
            URL: 'wss://chat.venge.io',
            messages: [],
            message: '',
            currentOnline: 0
        }
    },
    methods: {
        connectChatServer: function(roomId) {
            if (this.ws) {
                this.ws.close();
            }

            this.roomId = this.slug(roomId);

            if (this.roomId) {
                var URL = this.URL;

                if (this.isDebug) {
                    URL = this.testURL;
                }

                this.ws = new WebSocket(URL + '/?' + this.roomId);
                this.ws.binaryType = 'arraybuffer';

                this.ws.onopen = this.onOpen.bind(this);
                this.ws.onclose = this.onClose.bind(this);
                this.ws.onmessage = this.onMessage.bind(this);
            }
        },
        onOpen: function() {
            this.log('Network connection is open!');
        },
        onClose: function() {
            this.log('Network connection is close!');
        },
        onMessage: function(event) {
            var buf = new Uint8Array(event.data);
            buf = MessagePack.Buffer.from(buf);

            var message = this.pack.decode(buf);

            if (message) {
                this.parse(message);
            }
        },
        auth: function(data) {
            var username = app.session.username;

            if (username) {
                username = this.cleanUsername(username);
            }

            this.send([
                this.keys.auth,
                this.roomId,
                app.session.hash,
                username
            ]);
        },
        chat: function(data) {
            var username = data[0];
            var message = data[1];

            this.addMessage(username, message);
        },
        clear: function() {
            this.messages = [];
        },
        sendMessage: function() {
            var message = this.message;

            if (message.length > 0 && message.length < 60) {
                this.send([this.keys.chat, message]);
                this.message = '';
            } else {
                app.alert('Can\'t send more than 60 characters.');
            }
        },
        history: function(data) {
            var messages = data[0];
            var i = messages.length;

            console.log(data);

            this.clear();

            for (var messageIndex in messages) {
                var message = messages[messageIndex];

                this.addMessage(message.username, message.message);
            }
        },
        addMessage: function(username, message) {
            this.messages.push({
                username: app.cleanMarkup(username),
                message: message
            });

            var chatBox = document.querySelector('.chat-box');

            if (chatBox) {
                setTimeout(function() {
                    chatBox.scrollTo(0, 1000000);
                }, 100);
            }
        },
        send: function(data) {
            console.log(this.ws, this.ws.OPEN);
            if (this.ws && this.ws.readyState == this.ws.OPEN) {
                this.ws.send(this.pack.encode(data));
            }
        },
        online: function(data) {
            this.currentOnline = data[0];
        },
        parse: function(message) {
            if (message.length === 0) {
                return false;
            }

            var key = message[0];

            if (Object.keys(this.keys).indexOf(key) > -1) {
                this[this.keys[key]](message.splice(1, message.length + 1));
            }
        },
        log: function(message) {
            console.log(message);
        },
        slug: function(str) {
            if (!str) {
                return '';
            }

            str = str.replace(/^\s+|\s+$/g, ''); // trim
            str = str.toLowerCase();

            // remove accents, swap ñ for n, etc
            var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
            var to = "aaaaeeeeiiiioooouuuunc------";
            for (var i = 0, l = from.length; i < l; i++) {
                str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }

            str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-'); // collapse dashes

            return str;
        },
        cleanUsername: function(text) {
            return text.replace(/\[color="(.*?)"\]/g, '')
                .replace(/\[\/color]/g, '')
                .replace(/\\/g, '').trim();
        },
        getKeys: function() {
            return {
                'auth': 'auth',
                'info': 'info',
                'chat': 'chat',
                'history': 'history',
                'online': 'online'
            };
        }
    },
    mounted: function() {
        this.pack = MessagePack.initialize(4194304);
        this.ws = false;

        this.keys = this.getKeys();

        this.connectChatServer(this.roomId);
    },
    template: `
        <form action="javascript:;" class="chat-wrap">
            <div class="chat-box">
                <ul>
                    <li v-for="message in messages" class="animate__animated animate__fadeInLeft animate__faster">
                        <b>{{message.username}}:</b> {{message.message}}
                    </li>
                </ul>
           </div>
           <div class="message-sent">
               <input type="text" v-model="message" v-on:keyup.enter="sendMessage()" placeholder="Press [ENTER] to send message.">
               <img src="images/icons/Chat-Icon.png" alt="">
           </div>
        </div>
    `
})