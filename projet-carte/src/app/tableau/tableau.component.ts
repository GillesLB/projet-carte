import { Component, OnInit } from '@angular/core';

import { Pays } from 'src/app/pays.modele';
import { TableauService } from 'src/app/services/tableau.service';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {

  listePays: Pays[] = [];

  isLoading = false;

  constructor(
    private tableauService: TableauService,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.tableauService.getListePays();
    this.listePays = this.tableauService.listePays;
    this.isLoading = false;
  }

  onSupprimer(pays) {
    this.tableauService.supprimer(pays);
  }

}
