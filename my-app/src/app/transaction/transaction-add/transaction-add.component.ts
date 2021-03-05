import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
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
  transactionType?: string;
  transactionMode?: string;
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

  //addform = new FormControl('auto');

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


  transaction: Transaction = new Transaction();

  save() {
    this.transactionService.addTransactions({ data: this.transaction }).subscribe((data: any) => {
      if (data.success) {

        //  this.messageService.add({severity:'success', summary:'Message', detail:'New Recipe Added.'});
        console.log("added");

      }
      else {

        //this.messageService.add({severity:'error', summary:'Error', detail:data.ErrorMessage});
        console.log("error");

      }

    })

  }



  ngOnInit() {

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
