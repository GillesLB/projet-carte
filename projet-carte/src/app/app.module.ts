import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CarteComponent } from './carte/carte.component';
import { TableauComponent } from './tableau/tableau.component';
import { DetailComponent } from './detail/detail.component';
import { CarteService } from 'src/app/services/carte.service';
import { TableauService } from 'src/app/services/tableau.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccueilComponent,
    CarteComponent,
    TableauComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    CarteService,
    TableauService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
