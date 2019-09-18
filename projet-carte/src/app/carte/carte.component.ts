import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// librairie pour cartes interactives
import * as L from 'leaflet';

import { Pays } from 'src/app/pays.modele';
import { CarteService } from 'src/app/services/carte.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {

  readonly NOM_REGEX = '^[a-zA-Z_-]+$';
  readonly COORDONNEES_REGEX = '^[0-9,.-]+$';

  ajouterPaysForm: FormGroup;

  listePays: Pays[] = [];

  constructor(
    public carteService: CarteService,
  ) { }

  ngOnInit() {
    this.listePays = this.carteService.listePays;

    // Initialise le formulaire
    this.ajouterPaysForm = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.pattern(this.NOM_REGEX)]),
      etat: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required, Validators.pattern(this.COORDONNEES_REGEX)]),
      longitude: new FormControl('', [Validators.required, Validators.pattern(this.COORDONNEES_REGEX)]),
    });

    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const projetcarte = L.map('cartemonde').setView([47.207527, -1.546276], 2);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Projet Carte'
    }).addTo(projetcarte);

    const origineIcon = L.icon({iconUrl: 'assets/images/origine-icon.png'});
    const dejaFaitIcon = L.icon({iconUrl: 'assets/images/deja-fait-icon.png'});
    const aFaireIcon = L.icon({iconUrl: 'assets/images/a-faire-icon.png'});

    L.marker([47.207527, -1.546276], {icon: origineIcon}).bindPopup('CSMSI - Atlantica').addTo(projetcarte).openPopup();
    this.bouclerPays(dejaFaitIcon, aFaireIcon, projetcarte);
  }

  bouclerPays(dejaFaitIcon, aFaireIcon, projetcarte) {
    for (let i = 0; i < this.listePays.length; i++) {
      if (this.listePays[i].etat === 'dejaVisite') {
        L.marker([this.listePays[i].latitude, this.listePays[i].longitude], {icon: dejaFaitIcon})
          .bindPopup(this.listePays[i].nom).addTo(projetcarte);
      };
      if (this.listePays[i].etat === 'aVisiter') {
        L.marker([this.listePays[i].latitude, this.listePays[i].longitude], {icon: aFaireIcon})
          .bindPopup(this.listePays[i].nom).addTo(projetcarte);
      };
    }
  }

  onSubmit() {
    const paysId = this.listePays.length + 1;
    const nom = this.ajouterPaysForm.get('nom').value;
    const etat = this.ajouterPaysForm.get('etat').value;
    const latitude = this.ajouterPaysForm.get('latitude').value;
    const longitude = this.ajouterPaysForm.get('longitude').value;
    const paysAAjouter = new Pays(paysId, nom, etat, latitude, longitude);
    console.log('paa : ', paysAAjouter);
    // this.liste.push(chienAAjouter);
    // this.store.dispatch(new AjouterChien(chienAAjouter));
    this.ajouterPaysForm.reset();
  }
}
