import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/database';

import { Pays } from 'src/app/pays.modele';
import { listePays } from 'src/app/liste-pays';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class TableauService {

  listePays: Pays[] = [];

  constructor() {
    this.listePays = listePays;
  }

  getListePays() {
    // récupérer la liste des pays sauvegardés dans firebase
    firebase.database().ref('/listePays')
      .on('value', (data: DataSnapshot) => {
        this.listePays = data.val() ? data.val() : [];
      }
    );
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
    firebase.database().ref('/listePays').set(this.listePays);
  }
}
