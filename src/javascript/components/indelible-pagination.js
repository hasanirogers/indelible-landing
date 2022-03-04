import { html, css, LitElement } from 'lit';

class IndeliblePagination extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid gray;
        }

        ul {
          font-size: 1.1rem;
          display: flex;
          gap: 1rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        a,
        span {
          text-decoration: none;
          display: inline-block;
          padding: 0.5rem 1rem;
          border: 1px solid lightgray;
        }

        span {
          color: #ffffff;
          border: 1px solid var(--sl-color-primary-600);
          background-color: var(--sl-color-primary-600);
        }
      `
    ]
  }

  static get properties() {
    return {
      total: {
        type: Number
      },
      current: {
        type: Number
      },
      limit: {
        type: Number
      }
    }
  }

  render() {
    return html`
      <ul>
        ${this.makePages()}
      </ul>
    `;
  }

  makePages() {
    const pages = [];

    for (let i = 0; i < this.total; i++) {
      const currentPage = i + 1;

      if (currentPage === this.current) {
        pages.push(html`<li><span>${currentPage}</span></li>`);
      } else {
        pages.push(html`<li><a href="/dashboard?page=${currentPage}&limit=${this.limit}">${currentPage}</a></li>`);
      }
    }

    return pages;
  }
}

window.customElements.define('indelible-pagination', IndeliblePagination);
