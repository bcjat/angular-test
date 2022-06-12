import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DayAgoPipe } from './pipes/day-ago.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, DayAgoPipe],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
