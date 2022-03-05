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

        a {
          color: var(--sl-color-primary-600);
        }

        a:hover {
          border: 1px solid var(--sl-color-primary-600);
        }

        .page span {
          color: #ffffff;
          border: 1px solid var(--sl-color-primary-600);
          background-color: var(--sl-color-primary-600);
        }
      `
    ]
  }

  static get properties() {
    return {
      link: {
        type: String
      },
      linkPrevious: {
        type: String,
        attribute: 'link-previous'
      },
      linkNext: {
        type: String,
        attribute: 'link-next'
      },
      linkFirst: {
        type: String,
        attribute: 'link-first'
      },
      linkLast: {
        type: String,
        attribute: 'link-last'
      },
      previous: {
        type: String,
      },
      next: {
        type: String,
      },
      first: {
        type: String,
      },
      last: {
        type: String,
      },
      total: {
        type: Number
      },
      current: {
        type: Number
      },
      labelPrevious: {
        type: String
      },
      labelNext: {
        type: String
      },
      labelFirst: {
        type: String,
      },
      labelLast: {
        type: String
      }
    }
  }

  constructor() {
    super();

    this.labelPrevious = '‹';
    this.labelNext = '›';
    this.labelFirst = '«';
    this.labelLast = '»';
  }

  render() {
    return html`
      <ul>
        ${this.makeFirstLink()}
        ${this.makePreviousLink()}
        ${this.makePageLinks()}
        ${this.makeNextLink()}
        ${this.makeLastLink()}
      </ul>
    `;
  }

  makePageLinks() {
    const pages = [];

    for (let i = 0; i < this.total; i++) {
      const currentPage = i + 1;

      if (currentPage === this.current) {
        pages.push(html`<li class="page" part="page"><span>${currentPage}</span></li>`);
      } else {
        pages.push(html`<li class="page" part="page"><a href=${this.interpolate(this.link, currentPage)}>${currentPage}</a></li>`);
      }
    }

    return pages;
  }

  makePreviousLink() {
    if (this.previous) {
      return html`<li class="previous" part="previous"><a href=${this.interpolate(this.linkPrevious, this.previous)}>${this.labelPrevious}</a></li>`;
    }

    if (this.previous === 'disabled') {
      return html`<li class="previous disabled" part="previous"><span>${this.labelPrevious}</span></li>`;
    }

    return null;
  }

  makeNextLink() {
    if (this.next) {
      return html`<li class="next" part="next"><a href=${this.interpolate(this.linkNext, this.next)}>${this.labelNext}</a></li>`;
    }

    if (this.next === 'disabled') {
      return html`<li class="next disabled" part="next"><span>${this.labelNext}</span></li>`;
    }

    return null;
  }

  makeFirstLink() {
    if (this.first) {
      return html`<li class="first" part="first"><a href=${this.interpolate(this.linkFirst, this.first)}>${this.labelFirst}</a></li>`;
    }

    if (this.first === 'disabled') {
      return html`<li class="first disabled" part="first"><span>${this.labelFirst}</span></li>`;
    }

    return null;
  }

  makeLastLink() {
    if (this.last) {
      return html`<li class="last" part="last"><a href=${this.interpolate(this.linkLast, this.last)}>${this.labelLast}</a></li>`;
    }

    if (this.last === 'disabled') {
      return html`<li class="last disabled" part="last"><span>${this.labelLast}</span></li>`;
    }

    return null;
  }

  interpolate(link, newValue) {
    link = link.replace('[[current]]', newValue);
    link = link.replace('[[previous]]', newValue);
    link = link.replace('[[next]]', newValue);
    link = link.replace('[[first]]', newValue);
    link = link.replace('[[last]]', newValue);

    return link;
  }
}

window.customElements.define('indelible-pagination', IndeliblePagination);
