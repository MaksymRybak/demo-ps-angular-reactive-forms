import { Component, OnInit } from '@angular/core';

import { Customer } from './customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      sendCatalog: true,
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
