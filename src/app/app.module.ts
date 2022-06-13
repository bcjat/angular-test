import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DayAgoPipe } from './pipes/day-ago.pipe';
import { FormsModule } from '@angular/forms';
import { LoadMoreDirective } from './directives/load-more.directive';

@NgModule({
  declarations: [AppComponent, DayAgoPipe, LoadMoreDirective],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
