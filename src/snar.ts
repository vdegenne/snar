import {css, LitElement, nothing} from 'lit';
export {state} from 'lit/decorators.js';

// type CustomElementClass = Omit<typeof HTMLElement, 'new'>;

function generateRandomKey() {
  const random = Math.floor(Math.random() * Date.now());
  return random.toString(36);
}

export function component(clazz: CustomElementConstructor) {
  const newClass = class extends clazz {
    constructor() {
      super();
      document.body.prepend(this);
    }
  };
  window.customElements.define(`snar-${generateRandomKey()}`, newClass);
  return newClass as any;
}

export class Snar extends LitElement {
  static styles = css`
    :host {
      display: none;
    }
  `;

  render() {
    return nothing;
  }

  // protected static finalize(): boolean {
  //   // if (!super.finalize()) {
  //   //   return;
  //   // }
  //   if (this.name !== 'Snar') {
  //     console.log(this);
  //     try {
  //       window.customElements.define(`snar-${generateRandomKey()}`, this);
  //     } catch (err) {}
  //   }
  //   return true;
  // }
}
