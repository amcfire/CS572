import { Component, OnInit, Input } from '@angular/core';
import { CanActivate, ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'userdetails',
  template: `
<br/>
  User detail of {{user.name.first}}
  <li>
 {{user.email}}
  </li>
  <li>
  {{user.gender}}
  </li>
  <li>
  {{user.login.uuid}}
  </li>
  `,
  styles: []
})
export class UserdetailsComponent implements OnInit {
  @Input() user: any;
  user_id = null;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.user = this.dataService.getUserDetail();
  }

  ngOnInit() {
  }

}