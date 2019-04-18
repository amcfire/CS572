import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { DataService } from './data.service';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],

  imports: [
    BrowserModule, HttpClientModule,
    RouterModule.forRoot([
      { path: 'users', loadChildren: './users.module#UsersLazyModule' },
      { path: 'error', component: NotFoundComponent }
    ])
  ],

  providers: [DataService],

  bootstrap: [AppComponent]
})
export class AppModule { }