import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';
import { TransactionService } from 'src/app/services/transaction.service';
import {MatPaginator} from '@angular/material/paginator';

export interface Transaction {
  id: string;
  transactionType: string;
  transactionMode: string;
  description: string;
  partyName: string;
  amount: string;

}

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})


export class TransactionListComponent implements OnInit {
  displayedColumns: string[] = ['id','partyName', 'transactionType','transactionMode','description','amount'];
  dataSource = new MatTableDataSource();
  transaction: Transaction[] = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private transactionService: TransactionService) { 
    
  }

  getData() {
    this.transactionService.getTransactions().subscribe((transaction: Transaction[]) => {
      console.log(transaction);
      this.transaction = transaction;
      //this.resultsLength = this.parties.total_count;
    });
  }

  ngOnInit() {
    this.getData();
    this.titleService.setTitle('Accounts - Transaction');
    //this.logger.log('Customers loaded');
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
  }

}
