import { css, LitElement, nothing } from 'lit';
export { state } from 'lit/decorators.js';
// type CustomElementClass = Omit<typeof HTMLElement, 'new'>;
function generateRandomKey() {
    const random = Math.floor(Math.random() * Date.now());
    return random.toString(36);
}
export function component(clazz) {
    const newClass = class extends clazz {
        constructor() {
            super(...arguments);
            document.body.prepend(this);
        }
    };
    window.customElements.define(`snar-${generateRandomKey()}`, newClass);
    return newClass;
}
class Snar extends LitElement {
    render() {
        return nothing;
    }
}
Snar.styles = css `
    :host {
      display: none;
    }
  `;
export { Snar };
//# sourceMappingURL=snar.js.map
