import './styles/styles.css';

import { html, css } from 'lit';
import { Router } from '@lit-labs/router';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// base
import { BSLitElement } from './base/bs-lit-element.js';

// components
import './components/toast-container.js';

// views
import './views/home-view.js';
import './views/test-toast-view.js';
import './views/data-fetching-view.js';
import './views/create-image-view.js';
import './views/about-view.js';

import { createToastService } from './services/toast-service.js';

class AppRoot extends BSLitElement {

  static styles = [
    super.styles,
    css`
      :host {
        display: block;
        height: 100vh;
      }

      .app-layout {
        display: flex;
        height: 100%;
      }

      /* Sidebar */
      .sidebar {
        width: 240px;
        min-width: 240px;
        background-color: #212529;
        color: #fff;
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease;
      }

      .sidebar-header {
        padding: 1.25rem 1rem;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }

      .sidebar-header h5 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: #fff;
      }

      .sidebar-nav {
        flex: 1;
        padding: 0.5rem 0;
        overflow-y: auto;
      }

      .sidebar-nav a {
        display: block;
        padding: 0.6rem 1rem;
        color: rgba(255,255,255,0.7);
        text-decoration: none;
        font-size: 0.9rem;
        transition: background-color 0.15s, color 0.15s;
      }

      .sidebar-nav a:hover {
        background-color: rgba(255,255,255,0.1);
        color: #fff;
      }

      /* Main content */
      .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .topbar {
        display: none;
        padding: 0.75rem 1rem;
        background-color: #f8f9fa;
        border-bottom: 1px solid #dee2e6;
      }

      .menu-btn {
        background: none;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        padding: 0.3rem 0.6rem;
        font-size: 1.2rem;
        cursor: pointer;
        line-height: 1;
      }

      .content {
        flex: 1;
        padding: 1.5rem;
        overflow-y: auto;
      }

      /* Overlay (mobile) */
      .overlay {
        display: none;
        position: fixed;
        inset: 0;
        background-color: rgba(0,0,0,0.4);
        z-index: 999;
      }

      /* Responsive: mobile < 768px */
      @media (max-width: 767px) {
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 1000;
          transform: translateX(-100%);
        }

        .sidebar.open {
          transform: translateX(0);
        }

        .overlay.open {
          display: block;
        }

        .topbar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
      }
    `
  ];

  static properties = {
    _menuOpen: { state: true }
  };

  _router = new Router(this, [
    { path: '/', render: () => html`<home-view></home-view>` },
    { path: '/about', render: () => html`<about-view></about-view>` },
    { path: '/hello-world', render: () => html`<hello-world-view></hello-world-view>` },
    { path: '/name-tag', render: () => html`<name-tag-view></name-tag-view>` },
    { path: '/data-fetching', render: () => html`<data-fetching-view></data-fetching-view>` },
    { path: '/test-toast', render: () => html`<test-toast-view></test-toast-view>` },
    { path: '/create-image', render: () => html`<create-image-view></create-image-view>` },
    { path: '/*', render: () => html`<home-view></home-view>` }
  ]);

  constructor() {
    super();
    this._menuOpen = false;
  }

  firstUpdated() {
    const container = this.renderRoot.querySelector('#toastContainer01');
    createToastService(container);
  }

  _toggleMenu() {
    this._menuOpen = !this._menuOpen;
  }

  _closeMenu() {
    this._menuOpen = false;
  }

  render() {
    return html`
      <div class="app-layout">

        <div class="overlay ${this._menuOpen ? 'open' : ''}"
             @click=${this._closeMenu}></div>

        <nav class="sidebar ${this._menuOpen ? 'open' : ''}">
          <div class="sidebar-header">
            <h5>your title app</h5>
          </div>
          <div class="sidebar-nav" @click=${this._closeMenu}>
            <a href="/">Home</a>
            <a href="/test-toast">Toast Demo</a>
            <a href="/data-fetching">Data Fetching</a>
            <a href="/about">About</a>
          </div>
        </nav>

        <div class="main">
          <div class="topbar">
            <button class="menu-btn" @click=${this._toggleMenu}>&#9776;</button>
            <strong>Item Finder</strong>
          </div>

          <div class="content">
            ${this._router.outlet()}
          </div>
        </div>

        <toast-container id="toastContainer01"></toast-container>
      </div>
    `;
  }
}

customElements.define('app-root', AppRoot);

