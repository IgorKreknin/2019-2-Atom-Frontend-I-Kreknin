const template = document.createElement('template');
template.innerHTML = `
    <style>
        form-input {
            width: 100%;
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

        message-pattern {
            flex: 0 1 auto;
            max-width: 70%;
        }

        input[type=submit] {
            visibility: collapse;
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
        this.key = document.location.search.replace('?', '');
        this.data = JSON.parse(localStorage.getItem(this.key));

        this.$form.addEventListener('submit', this._onSubmit.bind(this));
        this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
        document.addEventListener('DOMContentLoaded', this._onDOMLoaded.bind(this));
    }

    putCopyOnStore(data) {
        this.data.messages.push(data);
        this.data.lastMessage = data.text;
        this.data.lastMessageTime = data.time;
        localStorage.setItem(this.key, JSON.stringify(this.data));
    }

    craeteDiv(data) {
        const currentMessage = document.createElement('message-pattern');
        currentMessage.$text.innerText = data.text;
        currentMessage.$time.innerText = data.time;
        this.putCopyOnStore(data);
        return currentMessage;
    }

    _onSubmit(event) {
        event.preventDefault();
        const data = {};
        const currentTime = new Date();
        data.time = `${currentTime.getHours() > 9 ? currentTime.getHours() : `0${currentTime.getHours()}`
                        }:${currentTime.getMinutes() > 9 ? currentTime.getMinutes() : `0${currentTime.getMinutes()}`}`;
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

    _onDOMLoaded() {
        document.querySelector('message-form-header').$name.innerText = this.data.name;
        for (let i = 0; i < this.data.messages.length; i += 1) {
            const currentMessage = document.createElement('message-pattern');
            const data = this.data.messages[i];
            currentMessage.$text.innerText = data.text;
            currentMessage.$time.innerText = data.time;
            this.$message.append(currentMessage);
        }
    }
}

customElements.define('message-form', MessageForm);
