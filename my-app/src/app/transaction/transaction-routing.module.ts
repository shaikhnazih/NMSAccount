import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionAddComponent } from './transaction-add/transaction-add.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: TransactionListComponent },
      { path: 'add', component: TransactionAddComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class transactionRoutingModule { }
