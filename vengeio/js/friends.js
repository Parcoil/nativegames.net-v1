var chat = {
    players: [],
    isOnline: true,
    isOpen: false,
    roomId: 'NDA',
    wrapper: false,
    URL: 'wss://friends.venge.io',
    ws: false,
    hash: '',
    myUsername: false,
    notificationHolder: false,
    messageUsername: false,
    messages: {},
    isLoaded: false,
    isInitalized: false,
    init: function() {
        if (this.isInitalized) {
            return false;
        }

        this.isInitalized = true;
        document.onkeypress = function(event) {
            if (
                event.keyCode == 67 &&
                event.shiftKey == true &&
                document.activeElement.tagName != 'INPUT'
            ) {
                chat.toggle();
            }
        };

        this.wrapper = document.createElement('div');
        this.wrapper.id = 'wrapper-shadow';
        this.wrapper.style.display = 'none';
        this.wrapper.onclick = function(event) {
            chat.close();
        };

        //sidebar
        this.sidebar = document.createElement('div');
        this.sidebar.id = 'sidebar';
        this.sidebar.onclick = function(event) {
            event.stopPropagation();
        };

        this.onlineCounter = document.createElement('span');
        this.onlineCounter.id = 'online-counter';
        this.onlineCounter.innerText = '(0)';

        //sidebar title
        var title = document.createElement('h2');
        title.id = 'title';
        title.innerHTML = 'Friends';

        title.appendChild(this.onlineCounter);

        var close = document.createElement('a');
        close.id = 'close';
        close.innerText = 'x';
        close.onclick = function() {
            chat.close();
        };

        var addFriend = document.createElement('button');
        addFriend.id = 'add-friend';
        addFriend.type = 'button';
        addFriend.innerText = '[+] Click here to add friend';
        addFriend.onclick = function() {
            app.goFollowings();
            chat.close();
        };

        this.sidebar.appendChild(title);
        this.sidebar.appendChild(close);

        this.sidebar.appendChild(addFriend);

        this.emptyWarning = document.createElement('div');
        this.emptyWarning.innerText = 'Please wait...';
        this.emptyWarning.id = 'empty-warning';

        this.sidebar.appendChild(this.emptyWarning);

        var footerDescription = document.createElement('div');
        footerDescription.id = 'footer-description';
        footerDescription.innerText =
            'You need to follow each other in order to use friends system.';

        this.sidebar.appendChild(footerDescription);

        var footer = document.createElement('div');
        footer.id = 'footer';

        this.footerOption = document.createElement('select');
        this.footerOption.className = '';

        var footerHTML = '<option ' + (chat.isOnline ? 'selected' : '') + '>My Status : Online</option>';
        footerHTML += '<option ' + (!chat.isOnline ? 'selected' : '') + '>My Status : Offline</option>';

        this.footerOption.innerHTML = footerHTML;

        this.footerOption.onchange = function() {
            var value = this.value.split(' : ');
            var status = value[1];

            if (status == 'Online') {
                this.className = 'online';
            } else {
                this.className = 'offline';
            }

            chat.setStatus(status);
            app.setStorage('status', status, true);
        };

        //this.footerOption.onchange();
        footer.appendChild(this.footerOption);

        this.sidebar.appendChild(footer);

        this.wrapper.appendChild(this.sidebar);

        document.body.appendChild(this.wrapper);

        this.notificationHolder = document.createElement('div');
        this.notificationHolder.id = 'notification-holder';

        document.body.appendChild(this.notificationHolder);
    },
    connect: function(hash) {
        if (this.isLoaded) {
            return false;
        }

        this.isLoaded = true;

        if (hash) {
            this.hash = hash;
        } else {
            return false;
        }

        this.pack = MessagePack.initialize(4194304);

        this.ws = new WebSocket(this.URL);
        this.ws.binaryType = 'arraybuffer';

        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
    },
    onOpen: function(event) {
        console.log('Connection successfuly established!');
    },
    onClose: function(event) {

    },
    onMessage: function(event) {
        var buf = new Uint8Array(event.data);
        buf = MessagePack.Buffer.from(buf);

        var message = this.pack.decode(buf);

        if (message) {
            this.parse(message);
        }
    },
    parse: function(message) {
        if (message.length === 0) {
            return false;
        }

        var key = message[0];

        this[key](message.splice(1, message.length + 1));
    },
    send: function(data) {
        if (this.ws && this.ws.readyState == this.ws.OPEN) {
            this.ws.send(this.pack.encode(data));
        }
    },
    info: function(data) {
        this.myUsername = data[0];
    },
    auth: function(data) {
        this.send(['auth', this.hash]);
    },
    friends: function(data) {
        this.setPlayers(data[0]);

        if (app.getStorage('status', true)) {
            if (this.footerOption) {
                this.footerOption.value = 'My Status : ' + app.getStorage('status', true);
                this.footerOption.onchange();
            }
        }
    },
    online: function(data) {
        //set online
        for (var index in this.players) {
            var player = this.players[index];

            if (player.username == data[0]) {
                player.active = true;
                player.inGame = false;
            }
        }

        this.setPlayers();
    },
    offline: function(data) {
        //set online
        for (var index in this.players) {
            var player = this.players[index];

            if (player.username == data[0]) {
                player.active = false;
            }
        }

        this.setPlayers();
    },
    in_game: function(data) {
        //set online
        for (var index in this.players) {
            var player = this.players[index];

            if (player.username == data[0]) {
                player.active = true;
                player.inGame = true;
            }
        }

        this.setPlayers();
    },
    invite: function(data) {
        var username = data[0];
        var roomId = data[1];

        chat.showInvite(username, roomId);
    },
    setStatus: function(status) {
        this.send(['status', status]);
    },
    sendInvite: function(username) {
        //trigger a function
        //this.app.fire('RoomManager:Create', function(){ chat._sendInvite(username); });

        var self = this;

        /*
        pc.app.fire('View:Match', 'Invite');
        pc.app.fire('RoomManager:CreateInvite', function(){
            self._sendInvite(username);
        });
        
        pc.app.fire('DOM:DelayUpdate');
		*/

        app.createInvite(function(hash) {
            self._sendInvite(username, hash);
        });

        this.showNotification('Invite sent!');
    },
    _sendInvite: function(username, hash) {
        this.roomId = hash;
        this.send(['invite', username, this.roomId]);
    },
    onJoinGame: function() {
        this.send(['in-game', this.roomId]);
    },
    acceptInvite: function(username, hash) {
        window.location.hash = hash;
        this.send(['accept', username, hash]);
    },
    cancelInvite: function(username, hash) {
        this.send(['cancel', username, hash]);
    },
    accept: function(data) {
        console.log(data[0], ' accepted your invite!');
        chat.showNotification(data[0] + ' accepted your invite!');
    },
    decline: function(data) {
        console.log(data[0], ' declined your invite!');
        chat.showNotification(data[0] + ' declined your invite!');
    },
    open: function(isShadow) {
        if (this.isOpen) {
            return false;
        }

        if (this.wrapper && isShadow) {
            return false;
        }

        if (!isShadow) {
            setTimeout(function(self) {
                pc.isButtonLocked = true;
                self.sidebar.className = 'active';
            }, 100, this);
        }

        this.isOpen = true;

        if (this.wrapper) {
            this.wrapper.style.display = 'block';

            setTimeout(function(self) {
                pc.isButtonLocked = true;
                self.sidebar.className = 'active';
            }, 100, this);

            return false;
        }

        //chat.openMessagePanel();

        if (isShadow) {
            this.wrapper.style.display = 'none';
            this.isOpen = false;
        }
    },
    close: function() {
        pc.isButtonLocked = false;

        if (this.wrapper) {
            console.log(this.wrapper);
            this.wrapper.style.display = 'none';
        }

        this.sidebar.className = '';

        this.messageUsername = false;
        this.isOpen = false;
    },
    toggle: function() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },
    setPlayers: function(players) {
        if (players) {
            this.players = players;
        }

        if (!this.sidebar) {
            return false;
        }

        this.emptyWarning.remove();

        if (this.playerHolder) {
            this.playerHolder.remove();
        }

        this.playerHolder = document.createElement('div');
        this.playerHolder.id = 'player-holder';

        this.sidebar.appendChild(this.playerHolder);

        this.players.sort(function(a, b) {
            return b.active - a.active;
        });

        var onlineCount = 0;

        for (var index in this.players) {
            var player = this.players[index];
            var playerEntity = document.createElement('li');

            var playerHTML = '';
            playerHTML += '<span class="status ' + (player.active ? 'online' : '') + '"></span>';
            playerHTML += '<span class="username">' + player.username + '</span>';

            playerEntity.className = player.active ? 'online' : 'offline';
            playerEntity.innerHTML = playerHTML;

            if (player.active && !player.inGame) {
                var inviteButton = document.createElement('button');
                inviteButton.innerText = '⚔️ Invite';
                inviteButton.username = player.username;
                inviteButton.className = 'invite-button';

                inviteButton.onclick = function() {
                    chat.sendInvite(this.username);
                };

                playerEntity.appendChild(inviteButton);
            }

            if (player.inGame) {
                var playerStatus = document.createElement('span');
                playerStatus.innerText = 'Playing Game';
                playerStatus.className = 'player-status';

                playerEntity.appendChild(playerStatus);
            }

            if (player.active) {
                var chatButton = document.createElement('button');
                chatButton.innerText = '💭';
                chatButton.username = player.username;
                chatButton.className = 'invite-button chat-button';

                chatButton.onclick = function() {
                    chat.openMessagePanel(this.username);
                };

                playerEntity.appendChild(chatButton);

                onlineCount++;
            }

            this.playerHolder.appendChild(playerEntity);
        }

        this.onlineCounter.innerText = '(' + onlineCount + ')';

        app.friends.online = onlineCount;
        app.friends.list = this.players;
        //pc.app.fire('CustomText:OnlineFriends', onlineCount + ' / ' + this.players.length);
    },
    showInvite: function(username, hash) {
        var HTML = '<span class="status online"></span><b>' + username + '</b> invites you!';

        var inviteButton = document.createElement('button');
        inviteButton.className = 'invite-button';
        inviteButton.innerHTML = '⚔️ Accept';
        inviteButton.data = {
            username: username,
            hash: hash
        };

        inviteButton.onclick = function() {
            this.parentElement.remove();
            chat.acceptInvite(this.data.username, this.data.hash);
        };

        var cancelButton = document.createElement('button');
        cancelButton.className = 'invite-button cancel-button';
        cancelButton.innerHTML = 'Cancel';
        cancelButton.data = {
            username: username,
            hash: hash
        };

        cancelButton.onclick = function() {
            this.parentElement.remove();

            chat.open();
            chat.cancelInvite(this.data.username, this.data.hash);
        };

        var invite = document.createElement('div');
        invite.className = 'invite-notification';
        invite.innerHTML = HTML;

        invite.appendChild(cancelButton);
        invite.appendChild(inviteButton);

        setTimeout(function(invite) {
            invite.className = 'invite-notification active';
        }, 100, invite);

        this.notificationHolder.appendChild(invite);
    },
    showNotification: function(text, action, click) {
        var HTML = '' + text;

        var notification = document.createElement('div');
        notification.className = 'invite-notification';
        notification.innerHTML = HTML;

        if (action && click) {
            notification.onclick = function() {
                if (action == 'chat') {
                    chat.openMessagePanel(click);
                }
            };
        }

        setTimeout(function(notification) {
            notification.className = 'invite-notification active';
        }, 100, notification);

        setTimeout(function(notification) {
            notification.remove();
        }, 4000, notification);

        this.notificationHolder.appendChild(notification);
    },
    closeMessagePanel: function() {
        this.chatPanel.remove();
        this.messageUsername = false;
        this.isChatPanelOpen = false;

        this.chatPanel = false;
    },
    openMessagePanel: function(username) {
        chat.open();

        if (chat.messageUsername != username) {
            //clear messages
            if (this.chatMessages) {
                this.chatMessages.innerHTML = '';

                //fetch messages back
                if (chat.messages[username]) {
                    this.chatUsername.innerHTML = '💭 <span>' + username + '</span>';

                    for (var index in chat.messages[username]) {
                        var message = chat.messages[username][index];

                        var chatMessage = document.createElement('li');
                        chatMessage.innerHTML = '<b>' + message[0] + ' :</b> ' + message[1];
                        chatMessage.className = message[2] ? 'me' : '';

                        this.chatMessages.appendChild(chatMessage);

                        this.chatMessages.scrollTop = 100000;
                    }
                }
            }
        }

        chat.messageUsername = username;

        if (this.chatPanel) {
            this.chatInputBox.focus();
            this.isChatPanelOpen = true;

            return false;
        }

        this.chatPanel = document.createElement('div');
        this.chatPanel.id = 'chat-panel';
        this.chatPanel.onclick = function(event) {
            event.stopPropagation();
            chat.chatInputBox.focus();
        };

        this.chatTitle = document.createElement('div');
        this.chatTitle.id = 'chat-title';

        this.chatUsername = document.createElement('span');
        this.chatUsername.innerHTML = '💭 <span>' + username + '</span>';

        var close = document.createElement('a');
        close.id = 'chat-close';
        close.innerText = 'x';
        close.onclick = function() {
            chat.closeMessagePanel();
        };

        this.chatTitle.appendChild(this.chatUsername);
        this.chatTitle.appendChild(close);

        this.chatMessages = document.createElement('div');
        this.chatMessages.id = 'chat-messages';

        //fetch messages back
        if (chat.messages[username]) {
            for (var index in chat.messages[username]) {
                var message = chat.messages[username][index];

                var chatMessage = document.createElement('li');
                chatMessage.innerHTML = '<b>' + message[0] + ' :</b> ' + message[1];
                chatMessage.className = message[2] ? 'me' : '';

                this.chatMessages.appendChild(chatMessage);

                this.chatMessages.scrollTop = 100000;
            }
        }

        this.chatInputBox = document.createElement('input');
        this.chatInputBox.id = 'chat-input-box';
        this.chatInputBox.placeholder = 'Type your message and press [ENTER]';
        this.chatInputBox.onkeydown = function(event) {
            if (event.key == 'Enter') {
                if (document.activeElement == this && this.value.length > 0) {
                    chat.sendMessage(this.value);
                    this.value = '';
                } else {
                    this.focus();
                }
            }
        };

        this.chatPanel.appendChild(this.chatTitle);
        this.chatPanel.appendChild(this.chatMessages);
        this.chatPanel.appendChild(this.chatInputBox);
        this.wrapper.appendChild(this.chatPanel);

        this.chatInputBox.focus();
        chat.isChatPanelOpen = true;
    },
    notification: function(data) {
        if (chat.messageUsername != data[2]) {
            chat.showNotification(data[0], data[1], data[2]);
        }
    },
    sendMessage: function(message) {
        this.send(['message', chat.messageUsername, message]);
    },
    message: function(data) {
        if (!chat.messages[data[0]]) {
            chat.messages[data[0]] = [];
        }

        if (!chat.messages[data[3]]) {
            chat.messages[data[3]] = [];
        }

        chat.messages[data[0]].push(data);

        if (chat.myUsername == data[0]) {
            chat.messages[data[3]].push(data);
        }

        if (!chat.chatMessages) {
            return false;
        }

        if (
            chat.messageUsername == data[0] ||
            chat.myUsername == data[0]
        ) {
            var chatMessage = document.createElement('li');
            chatMessage.innerHTML = '<b>' + data[0] + ' :</b> ' + data[1];
            chatMessage.className = data[2] ? 'me' : '';

            chat.chatMessages.appendChild(chatMessage);
            chat.chatMessages.scrollTop = 100000;
        }
    }
};