import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lab_12';
  public parentCounter = 34;
  public infor;
  showOutputData(info) {
    this.infor = info;
    console.log('Counter Status=' + info);
  }
}