import { html, css, LitElement } from 'lit';

class IndelibleURL extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          cursor: pointer;
          min-width: 250px;
          padding: 1rem;
          border: 1px solid lightgray;
          border-radius: 0.25rem;
          background-color: rgba(255,255,255,0.8);
        }

        :host([copied]) {
          color: var(--color-success);
          border-color: var(--color-success);
        }

        div {
          display: grid;
          gap: 0.5rem;
          align-items: center;
          grid-template-columns: 1fr auto;
        }

        input {
          position: absolute;
          z-index: 1;
          width: 1px;
          height: 1px;
          opacity: 0;
        }
      `
    ];
  }

  static get properties() {
    return {
      pageID: {
        type: String,
        attribute: 'page-id'
      },
      domain: {
        type: String
      },
      copied: {
        type: Boolean,
        reflect: true
      }
    }
  }

  constructor() {
    super();

    this.domain = window.location.origin;
    this.addEventListener('click', this.handleClick.bind(this));
  }

  render() {
    const url = `${this.domain}/page/${this.pageID}`;
    const message = this.copied ? 'copied!' : url;

    return html`
      <div>
        <span>${message}</span>
        <sl-icon name=${this.getIcon()}></sl-icon>
        <input type="text" value=${url} />
      </div>`;
  }

  handleClick() {
    const text = this.shadowRoot.querySelector('input');
    text.select();
    document.execCommand("copy");
    this.copied = true;
    this.removeCopied();
  }

  removeCopied() {
    setTimeout(() => {
      this.copied = false;
    }, 3000)
  }

  getIcon() {
    if (this.copied) {
      return 'clipboard-check'
    }

    return 'clipboard'
  }
}

window.customElements.define('indelible-url', IndelibleURL);
