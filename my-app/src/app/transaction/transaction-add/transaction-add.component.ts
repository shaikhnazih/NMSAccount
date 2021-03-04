import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule} from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';

export interface Transaction {
  id: string;
  transactionType: string;
  transactionMode: string;
  description: string;
  partyName: string;
  amount: string;
  transactionDateTime: string;

}

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {
  options: FormGroup;
  floatLabelControl = new FormControl('auto');

  constructor(fb: FormBuilder,private transactionService:TransactionService) { 
    this.options = fb.group({
    
    floatLabel: this.floatLabelControl,
  }); }

  listType: [
    {"name": "Debit", ID: "Debit", "checked": true},
    {"name": "Credit", ID: "Credit", "checked": false}
  ]
  
 
  
  transaction: Transaction[] = [];

  save() {
    debugger;
         this.transactionService.addTransactions(this.transaction).subscribe((data: any) => {
           if(data.success){

            //  this.messageService.add({severity:'success', summary:'Message', detail:'New Recipe Added.'});
            console.log("added");
           
           }
           else{

             //this.messageService.add({severity:'error', summary:'Error', detail:data.ErrorMessage});
             console.log("error");
             
           }
       
         })
      
       }
     
    
  

  ngOnInit() {
  }

}
