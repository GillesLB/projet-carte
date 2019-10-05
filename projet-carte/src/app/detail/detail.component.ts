import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pays } from 'src/app/pays.modele';
import { TableauService } from 'src/app/services/tableau.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  paysId;

  listePays: Pays[] = [];

  constructor(
    private route: ActivatedRoute,
    private tableauService: TableauService,

  ) { }

  ngOnInit() {
    this.listePays = this.tableauService.listePays;
    this.paysId = +this.route.snapshot.paramMap.get('paysId') - 1;
  }

}
