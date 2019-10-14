const template = document.createElement('template');
template.innerHTML = `
    <style>
        form-input {
            width: 1000%;
        }

        .result {
            display: flex;
            flex-flow: column wrap-reverse;
            justify-content: flex-end;
            align-items: flex-start;
            align-content: flex-start;
            margin-top: 50px;
            margin-bottom: 46px;
            min-height: calc(100vh - 96px);
        }

        .result::-webkit-scrollbar {
            display: none;
        }

        .message {
            background: #f3e5f5;
            margin: 5px;
            padding: 5px 10px 5px 10px;
            flex: 0 1 auto;
            max-width: 70%;
            border-radius: 10px;
        }

        input[type=submit] {
            visibility: collapse;
        }

        .message-text {
            word-break: break-all;
            text-align: left;
        }

        .message-time {
            color: #898989;
            bottom: 0px;
            text-align: right;
            font-size: 10px;
        }
    </style>
    <form>
        <div class="result"></div>
        <form-input name="message" placeholder="Сообщеине"></form-input>
    </form>
`;

class MessageForm extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$form = this._shadowRoot.querySelector('form');
        this.$input = this._shadowRoot.querySelector('form-input');
        this.$message = this._shadowRoot.querySelector('.result');

        this.items = localStorage.getItem('items');
        if (this.items === null) this.items = 0;

        for (let i = 0; i < this.items; i += 1) {
            const message = document.createElement('div');
            const messageText = document.createElement('div');
            const messageTime = document.createElement('div');
            const data = JSON.parse(localStorage.getItem(i));
            message.className = 'message';
            messageText.innerText = data.text;
            messageText.className = 'message-text';
            messageTime.innerText = data.time;
            messageTime.className = 'message-time';
            message.append(messageText);
            message.append(messageTime);
            this.$message.append(message);
            window.scrollTo(0, this.$message.scrollHeight);
        }

        this.$form.addEventListener('submit', this._onSubmit.bind(this));
        this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
    }

    putCopyOnStore(data) {
        localStorage.setItem(this.items, JSON.stringify(data));
        this.items = Number(this.items) + 1;
        localStorage.setItem('items', this.items);
    }

    craeteDiv(data) {
        const message = document.createElement('div');
        const messageText = document.createElement('div');
        const messageTime = document.createElement('div');
        message.className = 'message';
        messageText.innerText = data.text;
        messageText.className = 'message-text';
        messageTime.innerText = data.time;
        messageTime.className = 'message-time';
        message.append(messageText);
        message.append(messageTime);
        this.putCopyOnStore(data);
        return message;
    }

    _onSubmit(event) {
        event.preventDefault();
        const data = {};
        const currentTime = new Date();
        data.time = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
        data.text = this.$input.value;
        if (data.text === '') return;
        data.name = 'User';
        this.$message.append(this.craeteDiv(data));
        window.scrollTo(0, this.$message.scrollHeight);
        this.$input._shadowRoot.querySelector('input').value = '';
    }

    _onKeyPress(event) {
        if (event.keyCode === 13) {
            this.$form.dispatchEvent(new Event('submit'));
        }
    }
}

customElements.define('message-form', MessageForm);
