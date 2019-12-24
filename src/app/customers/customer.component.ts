import { Component, OnInit } from '@angular/core';

import { Customer } from './customer';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  constructor() { }

  ngOnInit() {
    this.customerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true),
    });
  }

  populateTestData() {
    this.customerForm.setValue({
      firstName: 'Maksym',
      lastName: 'Rybak',
      email: 'maksym.rybak@gmail.com',
      sendCatalog: true
    });
  }

  patchTestData() {
    this.customerForm.patchValue({
      firstName: 'Inga',
      lastName: 'Rybak',
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

}
