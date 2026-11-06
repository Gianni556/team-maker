import { LitElement } from 'lit';
import bootstrapCSS from "bootstrap/dist/css/bootstrap.min.css?inline";

const bootstrapSheet = new CSSStyleSheet();
bootstrapSheet.replaceSync(bootstrapCSS);

export class BSLitElement extends LitElement {
  static styles = [bootstrapSheet];
  static properties = {
    _lastSite : { state : false },
    _newSite : { state : false }
  }

  updateSite (whereAt, goTo) {
    this._lastSite = whereAt;
    this._newSite = goTo;
    window.location.href = goTo;
    return;
  }

  oldSite (whereAt) {
    window.location.href = this._lastSite;
    this._newSite = this._lastSite;
    this._lastSite = whereAt;
    return;
  }

  constructor () {
    super();
    this._lastSite = '/';
    this._newSite = '/';
  }
}
