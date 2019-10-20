const template = document.createElement('template');
template.innerHTML = `
    <style>
        .chat-pattern {
            display: flex;
            margin: 5px;
            cursor: pointer;
        }
        .description {
            display: flex;
            min-height: 30px;
            width: 100%;
        }
        .message {
            display: flex;
            min-height: 30px;
            width: 100%;
        }
        .name {
            flex: 1 1 auto;
            display: flex;
            align-items: flex-end;
            font-size: 18px;
        }
        .time {
            flex: 0 1 auto;
            color: #9b9b9b;
            display: flex;
            align-items: flex-end;
            font-size: 15px;
        }
        .last-message {
            flex: 1 1 auto;
            display: flex;
            align-items: center;
            color: #9b9b9b;
        }
        .message-status {
            flex: 0 1 auto;
            width: 30px;
            height: 30px;
        }
        .photo {
            flex: 0 1 auto;
            background-color: #ffd54f;
            height: 60px;
            width: 60px;
            border-radius: 30px;
            border: 1px solid #e5e5e5;
        }
        .chat-info {
            flex: 1 1 auto;
            width: calc(100% - 60px);
            border-bottom: 1px solid #e5e5e5;
            margin-right: 15px;
            margin-left: 15px;
            padding-bottom: 5px;
        }
    </style>
    <div class="chat-pattern">
        <img src="img/photo.svg" class="photo" />
        <div class="chat-info">
            <div class="description">
                <div class="name"></div>
                <div class="time"></div>
            </div>
            <div class="message">
                <div class="last-message"></div>
                <img src="img/rad.svg" class="message-status"/>
                <div class="incoming-messages"></div>
            </div>
        </div>
    </div>
`;

class Chat extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$image = this._shadowRoot.querySelector('.photo');
        this.$lastMessage = this._shadowRoot.querySelector('.last-message');
        this.$messageStatus = this._shadowRoot.querySelector('.message-status').querySelector('img');
        this.$name = this._shadowRoot.querySelector('.name');
        this.$time = this._shadowRoot.querySelector('.time');
        this.$incomingMessages = this._shadowRoot.querySelector('.incoming-messages');
        this.key = 0;

        this.addEventListener('click', this._onClick.bind(this));
    }

    _onClick() {
        document.dispatchEvent(new CustomEvent('clickOnChat', {
            detail: { key: this.key },
        }));
    }
}

customElements.define('chat-item', Chat);
