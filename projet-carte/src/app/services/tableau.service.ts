import { Injectable } from '@angular/core';

import { Pays } from 'src/app/pays.modele';
import { listePays } from 'src/app/liste-pays';

@Injectable({
  providedIn: 'root'
})
export class TableauService {

  listePays: Pays[] = [];

  constructor() {
    this.listePays = listePays;
  }

  supprimer(pays) {
    const paysASupprimer = this.listePays.findIndex(
      (paysIndex) => {
        if (paysIndex === pays) {
          return true;
        }
      }
    );
    this.listePays.splice(paysASupprimer, 1);
  }
}
