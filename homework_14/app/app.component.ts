import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `
  <h1>App Component</h1>
  <a [routerLink]="['']">Home</a>
  <a [routerLink]="['users']">Load Lazy Users Component</a>
  <router-outlet></router-outlet>
  `,
  providers: []
})
export class AppComponent {
  constructor(private dataService: DataService) { }
  ngOnInit() {
    console.log('getting data')
    this.dataService.getOnlineData().subscribe((data) => {
      console.log(data)
      localStorage.setItem('users', JSON.stringify(data['results']));
    });
  }
}
