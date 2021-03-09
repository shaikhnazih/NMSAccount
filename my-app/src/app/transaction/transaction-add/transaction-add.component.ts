import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';
import { NotificationService } from '../../core/services/notification.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';

import {
  NativeDateAdapter, DateAdapter,
  MAT_DATE_FORMATS
} from '@angular/material';
import { formatDate } from '@angular/common';
import { PartyService } from 'src/app/services/party.service';
import { Party } from 'src/app/Model/Dto';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};



class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd/MM/yyyy', this.locale);
    } else {
      return formatDate(date, 'dd/MM/yyyy', this.locale);
      //  return date.toDateString();
    }
  }
}

export class Transaction {
  id: string;
  transactionType?: string="credit";
  transactionMode?: string="cash";
  description?: string;
  partyName?: string;
  amount?: string;
  transactionDateTime?: string;

}

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ]
})
export class TransactionAddComponent implements OnInit {
  addform: FormGroup;
  filteredOptions: Observable<string[]>;
  parties: string[] = [];
  displayedColumns: string[] = ['partyName', 'amount'];
  dataSource = new MatTableDataSource();
  //addform = new FormControl('auto');
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(fb: FormBuilder, private transactionService: TransactionService,
    private partyService: PartyService
  ) {


    this.addform = new FormGroup({
      partyName: new FormControl(),
      description: new FormControl(),
      amount: new FormControl(),
      transactionMode: new FormControl(),
      transactionType: new FormControl(),
      transactionDateTime: new FormControl(),


    })
    // this.options = fb.group({

    //   floatLabel: this.addform,
    // });
  }

  listType: [
    { "name": "Debit", ID: "Debit", "checked": true },
    { "name": "Credit", ID: "Credit", "checked": false }
  ]

  getData() {
    this.transactionService.getTransactions("Top10").subscribe((transaction: Transaction[]) => {
      console.log(transaction);
      this.dataSource = new MatTableDataSource(transaction);
      // this.dataSource.paginator = this.paginator;
      this.sort.sort(({ id: 'id', start: 'desc'}) as MatSortable);
       this.dataSource.sort = this.sort;


      //this.resultsLength = this.parties.total_count;
    });
  }
  transaction: Transaction = new Transaction();

  save() {
    this.transactionService.addTransactions({ data: this.transaction }).subscribe((data: any) => {
      if (data.success) {

        //  this.messageService.add({severity:'success', summary:'Message', detail:'New Recipe Added.'});
        console.log("added");
        this.getData();
      }
      else {

        //this.messageService.add({severity:'error', summary:'Error', detail:data.ErrorMessage});
        console.log("error");
        this.getData();
      }

    })

  }



  ngOnInit() {
    this.getData();
    this.partyService.getParties().subscribe((parties: Party[]) => {
      console.log(parties);
      this.parties = parties.map((party) => (party.PartyName));
      //this.resultsLength = this.parties.total_count;


    });


    this.filteredOptions = this.addform.controls['partyName'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.parties.filter(option => option.toLowerCase().includes(filterValue));
  }



}
