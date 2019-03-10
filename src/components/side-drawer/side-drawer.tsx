import { Component, Prop, State, Method } from "@stencil/core";

@Component({
  tag: 'uc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
/**
 * shadow : true (au lieu de scoped: true) car stencil fournit les polyfill pour les old broser
 */
export class SideDrawer {

  // pour watcher une valeur qu'à l'interieur du component, donc re-execute render (comme Prop)
  @State() showContactInfo: boolean = false;

  // Prop sont immutable par defaut depuis le composant
  // reflectToAttr pour updater l'attribut
  @Prop({ reflectToAttr: true }) title: string;

  @Prop({ reflectToAttr: true, mutable: true }) opened: boolean;

  onCloseDrawer() {
    this.opened = false;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }

  // appelée de l'exterieur
  @Method()
  open() {
    this.opened = true;
  }

  render() {
    let mainContent = <slot />;
    if(this.showContactInfo) {
      mainContent = (
        <div id="contact-info-id">
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email.</p>
          <ul>
            <li>Phone: 251515151</li>
            <li>Email: <a href="mailto:test@test.com">test@test.com</a></li>
          </ul>
        </div>
      );
    }

    return [
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)}></div>,
      <aside>
        <header><h1>{this.title}</h1></header>
        <button class="close" onClick={this.onCloseDrawer.bind(this)}>X</button>
        <section id="tabs">
          <button class={!this.showContactInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'nav')}>Navigation</button>
          <button class={this.showContactInfo ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'contact')}>Contact</button>
        </section>
        <main>
          {mainContent}
        </main>
      </aside>
    ];
  }
}
