import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IsVisibleDirective } from './is-visible.directive';
import { MakeBiggerDirective } from './make-bigger.directive';

@NgModule({
  declarations: [
    AppComponent,
    IsVisibleDirective,
    MakeBiggerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }