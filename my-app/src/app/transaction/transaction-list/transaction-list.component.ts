import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { MatPaginator } from '@angular/material/paginator';

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
  displayedColumns: string[] = ['transactionDateTime', 'partyName', 'transactionType', 'transactionMode', 'description', 'amount'];
  dataSource = new MatTableDataSource();
  transaction: Transaction[] = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private notificationService: NotificationService,
    private titleService: Title,
    private transactionService: TransactionService) {

  }

  getData() {
    this.transactionService.getTransactions().subscribe((transaction: Transaction[]) => {
      console.log(transaction);
      this.dataSource = new MatTableDataSource(transaction);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


      //this.resultsLength = this.parties.total_count;
    });
  }
  btnClick = function () {
    alert("btnClick");
    this.router.navigateByUrl('./customers/customers.module#CustomersModule');
  };
  ngOnInit() {
    this.getData();
    this.titleService.setTitle('Accounts - Transaction');
  }

}
