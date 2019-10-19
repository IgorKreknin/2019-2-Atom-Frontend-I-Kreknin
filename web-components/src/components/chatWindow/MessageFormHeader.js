const template = document.createElement('template');
template.innerHTML = `
    <style>
        .header {
            display: flex;
            position: fixed;
            top: 0px;
            height: 60px;
            width: 100%;
            background: #8e24aa;
        }
        .title {
            flex: 1 1 auto;
            display: flex;
            margin-left: 20px;

        }
        .name {
            flex: 1 1 auto;
            display: flex;
            align-items: center;
            font-size: 22px;
            color: white;
            margin-left: 20px;

        }
        .search {
            flex: 0 1 auto;
            width: 60px;
            height: 60px;
            cursor: pointer;

        }
        .menu {
            flex: 0 1 auto;
            width: 60px;
            height: 60px;
            cursor: pointer;

        }
        .back {
            flex: 0 1 auto;
            width: 60px;
            height: 60px;
            cursor: pointer;
        }
        .photo {
            flex: 0 1 auto;
            background-color: #ffd54f;
            height: 50px;
            width: 50px;
            border-radius: 30px;
            border: 1px solid #e5e5e5;
            margin-top: 5px;
            margin-bottom: 5px;
            margin-left: 0;
            margin-right: 0;
        }
        img {
            height: 35%;
            width: 35%;
            margin: 32.5%;
        }
    </style>
    <div class="header">
        <div class="back">
            <img src="img/back.svg" />
        </div>
        <div class="title">
            <img src="img/photo.svg" class="photo" />
            <div class="name"></div>
        </div>
        <div class="search">
            <img src="img/search.svg" />
        </div>
        <div class="menu">
             <img src="img/menu.svg" />
        </div>
    </div>
`;

class Header extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({
            mode: 'open',
        });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$back = this._shadowRoot.querySelector('.back');
        this.$name = this._shadowRoot.querySelector('.name');
        this.$search = this._shadowRoot.querySelector('.search');
        this.$menu = this._shadowRoot.querySelector('.menu');

        this.$back.addEventListener('click', this._onClickBack.bind(this));
        this.$search.addEventListener('click', this._onClickSearch.bind(this));
        this.$menu.addEventListener('click', this._onClickMenu.bind(this));
    }

    _onClickSearch() {
        console.log('Search');
    }

    _onClickBack() {
        document.location.replace(`${document.location.href.replace(/chat.html.+/g)}index.html`);
    }

    _onClickMenu() {
        console.log('Modal window');
    }
}

customElements.define('message-form-header', Header);
