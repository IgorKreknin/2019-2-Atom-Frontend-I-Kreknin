const template = document.createElement('template');
template.innerHTML = `
    <style>
        .container {
            display: flex;
            flex-flow: column-reverse;
            justify-content: flex-end;
            margin-top: 60px;
            min-height: calc(100vh - 60px);
            background-color: #f5f5f5;
        }
    </style>
    <div class="container">
    </div>
`;

class ChatContainer extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$container = this._shadowRoot.querySelector('.container');

        document.addEventListener('DOMContentLoaded', this._onDOMLoaded.bind(this));
        document.addEventListener('NewChat', this._onNewChat.bind(this));
        document.addEventListener('messageFormIsReady', this._onMessageFormReady.bind(this));
        document.addEventListener('backToChatSelector', this._onBackToChatSelector.bind(this));
    }

    _onDOMLoaded() {
        const chats = JSON.parse(localStorage.getItem('chats'));
        if (chats === null) return;
        for (let i = 0; i < chats.length; i += 1) {
            const chat = document.createElement('chat-item');
            chat.key = chats[i].key;
            chat.$name.innerText = chats[i].name;
            const data = JSON.parse(localStorage.getItem(chats[i].key));
            chat.$time.innerText = data.lastMessageTime;
            chat.$lastMessage.innerText = data.lastMessage;
            this.$container.append(chat);
        }
    }

    _onNewChat(event) {
        event.preventDefault();
        const chats = JSON.parse(localStorage.getItem('chats'));
        const chat = document.createElement('chat-item');
        chat.key = chats[chats.length - 1].key;
        chat.$name.innerText = chats[chats.length - 1].name;
        const data = JSON.parse(localStorage.getItem(chats[chats.length - 1].key));
        chat.$time.innerText = data.lastMessageTime;
        chat.$lastMessage.innerText = data.lastMessage;
        this.$container.append(chat);
    }

    _onMessageFormReady() {
        this.style.display = 'none';
        this.$container.innerHTML = '';
    }

    _onBackToChatSelector() {
        const chats = JSON.parse(localStorage.getItem('chats'));
        for (let i = 0; i < chats.length; i += 1) {
            const chat = document.createElement('chat-item');
            chat.key = chats[i].key;
            chat.$name.innerText = chats[i].name;
            const data = JSON.parse(localStorage.getItem(chats[i].key));
            chat.$time.innerText = data.lastMessageTime;
            chat.$lastMessage.innerText = data.lastMessage;
            this.$container.append(chat);
        }
        document.dispatchEvent(new Event('chatContainerIsReady'));
        this.style.display = 'block';
    }
}

customElements.define('chat-container', ChatContainer);
