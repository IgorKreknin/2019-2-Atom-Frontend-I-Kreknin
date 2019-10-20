const template = document.createElement('template');
template.innerHTML = `
    <style>
        .button {
            position: fixed;
            bottom: 30px;
            right: 30px;
            height: 60px;
            width: 60px;
            border-radius: 30px;
            background-color: #ffd54f;
            cursor: pointer;
            box-shadow: 0em 0.2em 5px rgba(122,122,122,0.4);
        }
        img {
            width: 50%;
            height: 50%;
            margin: 25%;
        }
    </style>
    <div class="button">
        <img src="img/pen.svg" />
    </div>
`;

class Button extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$button = this._shadowRoot.querySelector('.button');

        this.$button.addEventListener('click', this._onClick.bind(this));
        document.addEventListener('messageFormIsReady', this._onMessageFormReady.bind(this));
        document.addEventListener('backToChatSelector', this._onBackToChatSelector.bind(this));
    }

    _onClick() {
        const name = prompt('Название нового чата: ');
        if (name === null || name === '') return;
        const date = new Date();
        const key = `${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        const chatAbout = {
            key,
            name,
        };
        const chat = {
            messages: [],
            lastMessage: 'Этот чат пока пуст :(',
            lastMessageTime: `${date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
                                    }:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`.replace('\n', ''),
            name,
        };
        localStorage.setItem(key, JSON.stringify(chat));
        let chats = JSON.parse(localStorage.getItem('chats'));
        if (chats === null) chats = [];
        chats.push(chatAbout);
        localStorage.setItem('chats', JSON.stringify(chats));
        document.dispatchEvent(new Event('NewChat'));
    }

    _onMessageFormReady() {
        this.style.display = 'none';
    }

    _onBackToChatSelector() {
        this.style.display = 'block';
    }
}

customElements.define('add-button', Button);
