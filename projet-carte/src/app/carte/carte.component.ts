import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// librairie pour cartes interactives
import * as L from 'leaflet';

import { Pays } from 'src/app/pays.modele';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {

  readonly NOM_REGEX = '^[a-zA-Z_-]+$';
  readonly COORDONNEES_REGEX = '^[0-9,.-]+$';

  ajouterPaysForm: FormGroup;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    // Initialise le formulaire
    this.ajouterPaysForm = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.pattern(this.NOM_REGEX)]),
      etat: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required, Validators.pattern(this.COORDONNEES_REGEX)]),
      longitude: new FormControl('', [Validators.required, Validators.pattern(this.COORDONNEES_REGEX)]),
    });

    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const myplatonrestau = L.map('cartemonde').setView([47.207527, -1.546276], 2);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Projet Carte'
    }).addTo(myplatonrestau);

    const origineIcon = L.icon({iconUrl: 'assets/images/marker-icon-laposte.png'});
    const dejaFaitIcon = L.icon({iconUrl: 'assets/images/marker-icon-blue.png'});
    const aFaireIcon = L.icon({iconUrl: 'assets/images/marker-icon-blue.png'});

    L.marker([47.207527, -1.546276], {icon: origineIcon}).bindPopup('CSMSI - Atlantica').addTo(myplatonrestau).openPopup();
  }

  onSubmit() {
    const paysId = this.listePays.length + 1;
    const nom = this.ajouterPaysForm.get('nom').value;
    const etat = ''; // this.ajouterPaysForm.get('couleur').value;
    const latitude = this.ajouterPaysForm.get('latitude').value;
    const longitude = this.ajouterPaysForm.get('longitude').value;
    const paysAAjouter = new Pays(paysId, nom, etat, latitude, longitude);
    // this.liste.push(chienAAjouter);
    // this.store.dispatch(new AjouterChien(chienAAjouter));
    this.router.navigate(['carte']);
  }
}
