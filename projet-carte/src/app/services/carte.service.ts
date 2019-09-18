import { Injectable } from '@angular/core';

import { listePays } from 'src/app/liste-pays';
import { Pays } from 'src/app/pays.modele';

@Injectable({
  providedIn: 'root'
})
export class CarteService {

  listePays: Pays[] = [];

  constructor() {
    this.listePays = listePays;
  }

}
