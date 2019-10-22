const template = document.createElement('template');
template.innerHTML = `
    <style>
        .message {
            padding: 5px 10px 5px 10px;
            background: #f3e5f5;
            margin: 5px;
            border-radius: 10px;
            animation: swith 1s 1;
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
        
        @keyframes swith {
            0% {
                opacity: 0;
            }
        }
    </style>
    <div class="message">
        <div class="message-text"></div>
        <div class="message-time"></div>
    </div>
`;

class Message extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$text = this._shadowRoot.querySelector('.message-text');
        this.$time = this._shadowRoot.querySelector('.message-time');
    }
}

customElements.define('message-pattern', Message);
