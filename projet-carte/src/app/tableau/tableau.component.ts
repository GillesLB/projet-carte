import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pays } from 'src/app/pays.modele';
import { TableauService } from 'src/app/services/tableau.service';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {

  listePays: Pays[] = [];

  constructor(
    private tableauService: TableauService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.listePays = this.tableauService.listePays;
  }

  onSupprimer(pays) {
    this.tableauService.supprimer(pays);
  }

}
