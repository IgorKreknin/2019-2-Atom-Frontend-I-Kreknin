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
		.burger {
			flex: 0 1 auto;
			width: 60px;
			height: 60px;
			cursor: pointer;
		}
		img {
			height: 35%;
			width: 35%;
			margin: 32.5%;
		}
	</style>
	<div class="header">
		<div class="burger">
			<img src="img/burger.svg" />
		</div>
		<div class="title">Messanger</div>
		<div class="search">
			<img src="img/search.svg" />
		</div>
	</div>
`;

class Header extends HTMLElement {
	constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$burger = this._shadowRoot.querySelector('.burger');
        this.$title = this._shadowRoot.querySelector('.title');
        this.$search = this._shadowRoot.querySelector('.search');

        this.$burger.addEventListener('click', this._onClickBurger.bind(this));
        this.$search.addEventListener('click', this._onClickSearch.bind(this));
    }

    _onClickSearch() {
    	console.log('Search');
    }

    _onClickBurger() {
    	console.log('Burger');
    }
}

customElements.define('custom-header', Header);