const template = document.createElement('template');
template.innerHTML = `
    <style>
        input {
            border: 1px solid #e5e5e5;
            outline: none;
            width: calc(100% - 2px);
            bottom: 2px;
            position: fixed;
            height: 40px;
            font-size: 16px;
        }
    </style>
    <input type="text">
`;

class FormInput extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$input = this.shadowRoot.querySelector('input');
    }

    static get observedAttributes() {
        return ['name', 'value', 'placeholder', 'disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.$input.setAttribute(name, newValue);
    }

    get value() {
        return this.$input.value;
    }
}

customElements.define('form-input', FormInput);
