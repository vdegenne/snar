<div align="center">
<picture>
  <source srcset="./logo.png" alt="Snar" width="300" height="114"></source>
  <img src="./logo.png" alt="Snar" width="300" height="114">
</picture>


### LitElement wrapper for making reactive components.

[![Published on npm](https://raster.shields.io/npm/v/snar.png?logo=npm)](https://www.npmjs.com/package/snar)

</div>

Snar is a *micro*<sup>1</sup> wrapper built around [[ LitElement ]](https://github.com/lit/lit) that lets you quickly write reactive components.

While **LitElement** provides a neat way/syntax for writing *reactive* elements, it is hardcoded in the definition of its base class, which is tighly bound to an HTMLElement, that means you're left with no choice but to define a custom element if you want to use that feature.  
**Snar** uses LitElement in the background to hide this definition process so you can directly jump in and focus on writing your reactive components.



---
<sup>1</sup> Because it really is.

---

## Usage

```typescript
import {Snar, component, state} from 'snar';

@component
class MyComponent extends Snar {
  @state() value = 0;

  updated() {
    // when the state changes, this function is called.
    // do something
  }
}
```
then
```typescript
const component = new MyComponent();
component.value = 1; // `updated` function is called
```

## Why not using LitElement directly?

If you just want to benefit from using the reactive feature of `ReactiveElement` in Lit, it is likely you don't want to bother with these steps:
- Register a class as a custom element.
- Think of and give it a name.
- Care to connect it somewhere into the DOM.

Snar lets you pass all these requirements by automating all these steps for you automatically behind the scenes.

## Installation

```
npm i -D snar
```
or
```
yarn add -D snar
```

## More examples

Snar lets you implement any kind of granular logic  
(preferably encapsulated in its own module file).

Here are a few examples:

### Datastore
```typescript
// data.ts
@component
class DataStore extends Snar {
  protected hosts: ReactiveElement[];

  // shared state
  @state() username = 'anonymous';

  subscribe(host) { hosts.push(host); }
  unsubscribe(host) {
    hosts.splice(hosts.indexOf(host), 1);
  }
  
  updated() {
    hosts.forEach((host) => host.requestUpdate());
  }
}

export const store = new DataStore();
```
<details>
  <summary>how to use</summary>

```javascript
import {store} from './data.js';

class MyElement extends LitElement {
  render() {
    return html`Hello ${store.username}`;
  }

  connectedCallback() {
    store.subscribe(this);
  }
  disconnectedCallback() {
    store.unsubscribe(this);
  }
}
```
</details>

---

### Router
```typescript
// router.js
@component
class Router extends Snar {
  @state() pathname = '/'
  
  constructor() {
    super();
    // implement your router logic here
    // to update this.pathname when the uri changes.
    // window event listeners.
    // etc...
  }
  
  updated() {
    // when this.pathname changes
    // do something
    if (this.pathname == '/settings') {
      // lazy load <app-settings> ...
    }
    ...
  }
}

export const router = new Router();
```

---

### Joke for Unix users...
```typescript
@component
class DevNull extends Snar {
  @state() elementToDestroy;
  
  updated() {
    if (this.elementToDestroy) {
      this.elementToDestroy.remove();
    }
  }
}

const devNull = new DevNull();

devNull.elementToDestroy = document.body; // oops.
```

## Motivation behind Snar
As you can see the syntax is always the same, it makes things having a structure. If people use the same syntax everywhere, we can understand each other's code more easily.

Also it makes writing app's parts and custom elements feel more seamless.

As the web seems to be moving forward hyper modularity.

I made this small lib but I wish Lit had this feature built-in.

## Space for improvements
- Removing the need for a decorator
- Removing LitElement as a dependency. That is, writing the same logic as LitElement base class but without the need for a templating system and `HTMLElement` extended class. That would make Snar be usable inside any project (not just inside browsers).