import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// librairie pour cartes interactives
import * as L from 'leaflet';
import * as firebase from 'firebase/app';
import 'firebase/database';

import { listePays} from "../liste-pays";
import { Pays } from 'src/app/pays.modele';
import { CarteService } from 'src/app/services/carte.service';
import DataSnapshot = firebase.database.DataSnapshot;
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit, OnDestroy {

  readonly NOM_REGEX = '^[a-zA-Z_-]+$';
  readonly COORDONNEES_REGEX = '^[0-9,.-]+$';

  ajouterPaysForm: FormGroup;

  listePays: Pays[] = [];

  projetcarte;

  isLoading = false;

  constructor(
  ) { }

  ngOnInit() {
    this.getListePays();

    // Initialise le formulaire
    this.ajouterPaysForm = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.pattern(this.NOM_REGEX)]),
      etat: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required, Validators.pattern(this.COORDONNEES_REGEX)]),
      longitude: new FormControl('', [Validators.required, Validators.pattern(this.COORDONNEES_REGEX)]),
    });
  }

  getListePays() {
    this.isLoading = true;

    // Récupère la liste des pays sauvegardée dans firebase
    firebase.database().ref('/listePays')
      .on('value', (data: DataSnapshot) => {
        this.listePays = data.val() ? data.val() : [];
        this.voirCarte();
      }
    );

    this.isLoading = false;
  }

  voirCarte() {
    this.isLoading = true;

    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    this.projetcarte = L.map('cartemonde').setView([47.207527, -1.546276], 2);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Projet Carte'
    }).addTo(this.projetcarte);

    const origineIcon = L.icon({iconUrl: 'assets/images/origine-icon.png'});
    const dejaFaitIcon = L.icon({iconUrl: 'assets/images/deja-fait-icon.png'});
    const aFaireIcon = L.icon({iconUrl: 'assets/images/a-faire-icon.png'});

    L.marker([47.207527, -1.546276], {icon: origineIcon}).bindPopup('CSMSI - Atlantica').addTo(this.projetcarte).openPopup();

    this.bouclerPays(dejaFaitIcon, aFaireIcon, this.projetcarte);

    this.isLoading = false;
  }

  mettreAJourCarte() {
    // Effacer la carte existante
    this.projetcarte.remove();
    // Afficher la carte avec le nouveau pays
    this.voirCarte();
  }

  bouclerPays(dejaFaitIcon, aFaireIcon, projetcarte) {
      for (const pays of this.listePays) {
        if (pays.etat === 'dejaVisite') {
          L.marker([pays.latitude, pays.longitude], {icon: dejaFaitIcon})
            .bindPopup(pays.nom).addTo(projetcarte);
        }
        if (pays.etat === 'aVisiter') {
          L.marker([pays.latitude, pays.longitude], {icon: aFaireIcon})
            .bindPopup(pays.nom).addTo(projetcarte);
        }
    }
  }

  onSubmit() {
    const paysId = this.listePays.length + 1;
    const nom = this.ajouterPaysForm.get('nom').value;
    const etat = this.ajouterPaysForm.get('etat').value;
    const date = '';
    const latitude = this.ajouterPaysForm.get('latitude').value;
    const longitude = this.ajouterPaysForm.get('longitude').value;
    const paysAAjouter = new Pays(paysId, nom, etat, date, latitude, longitude);
    this.listePays.push(paysAAjouter);
    this.sauverListeVoyages();
    this.mettreAJourCarte();
    this.ajouterPaysForm.reset();
  }

  // Sauvegarder la nouvelle liste des pays dans firebase
  sauverListeVoyages() {
    firebase.database().ref('/listePays').set(this.listePays);
  }

  ngOnDestroy() {
    // this.projetcarte.remove();
    console.log('destroyed');
  }

}
