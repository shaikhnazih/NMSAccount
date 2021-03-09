import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { transactionRoutingModule } from './transaction-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TransactionAddComponent } from './transaction-add/transaction-add.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatRadioModule } from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [TransactionListComponent, TransactionAddComponent],
  imports: [
    CommonModule,
    transactionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatGridListModule
  ],
  // declarations: [
  //   TransactionListComponent
  // ],
  entryComponents: [
  ]
})
export class transactionModule { }
