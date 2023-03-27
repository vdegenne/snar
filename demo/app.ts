import {component, Snar, state} from '../src/snar.js';


@component
class MyComponent extends Snar {
  @state() value = 12;

  updated() {
    // do something when `value` update
    console.log(this.value);
  }
}


export const comp = new MyComponent();