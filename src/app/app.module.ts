import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ApiService } from './httpwrapper/api.service';
import { LiveClassComponent } from './live-class/live-class.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LiveClassComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,AppRoutingModule
  ],
  providers: [ApiService],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }
