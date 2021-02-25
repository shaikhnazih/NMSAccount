import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';
import { PartyService } from 'src/app/services/party.service';
import {MatPaginator} from '@angular/material/paginator';

export interface Party {
  PartyName: string;
  Category: string;

}

const ELEMENT_DATA: Party[] = [
  { PartyName: 'aa', Category: 'Hydrogen' },

];

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['PartyName', 'Category'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  parties: Party[] = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  resultsLength = 5;
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private partyService: PartyService
  ) { 
  
  }
  getData() {
    this.partyService.getParties().subscribe((parties: Party[]) => {
      console.log(parties);
      this.parties = parties;
      //this.resultsLength = this.parties.total_count;
    });
  }

  
  ngOnInit() {
    this.getData();
    this.titleService.setTitle('Accounts - Parties');
    //this.logger.log('Customers loaded');
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
  }
}

