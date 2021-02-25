import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { transactionRoutingModule } from './transaction-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TransactionListComponent],
  imports: [
    CommonModule,
    transactionRoutingModule,
    SharedModule
  ],
  // declarations: [
  //   TransactionListComponent
  // ],
  entryComponents: [
  ]
})
export class transactionModule { }
