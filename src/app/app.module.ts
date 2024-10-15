import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonajeListComponent } from './components/personaje-list/personaje-list.component';
import { PaginacionComponent } from './components/paginacion/paginacion.component';
import { PersonajeCardComponent } from './components/personaje-card/personaje-card.component';
import { HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    PersonajeListComponent,
    PersonajeCardComponent,
    PaginacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
