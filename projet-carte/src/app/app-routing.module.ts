import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from 'src/app/accueil/accueil.component';
import { DetailComponent } from 'src/app/detail/detail.component';
import { TableauComponent } from 'src/app/tableau/tableau.component';
import { CarteComponent } from 'src/app/carte/carte.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'carte', component: CarteComponent },
  { path: 'tableau', component: TableauComponent },
  { path: 'tableau/:paysId', component: DetailComponent },
  { path: '**', component: AccueilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
