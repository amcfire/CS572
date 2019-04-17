import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-component-counter',
  template: `
    <p>
      Lab 12
    </p>
    <h1>This is the Counter:</h1>
    <div>
      <button (click)="decrement()"> - </button> 
        {{counter}}
      <button (click)="increment()"> + </button> 
    </div>
    <p><ng-content></ng-content></p>
  `,
  styles: []
})
export class CounterComponent {
  @Input() counter: number;
  @Output() messageClick = new EventEmitter();

  constructor() {
    console.log(this.counter);
  }
  increment() {
    this.counter += 1;
    this.messageClick.emit(this.counter.toString());
  }
  decrement() {
    if (this.counter > 0) {
      this.counter -= 1;
    }
    this.messageClick.emit(this.counter.toString());
  }
}