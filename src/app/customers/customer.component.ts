import { Component, OnInit } from '@angular/core';

import { Customer } from './customer';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const email = c.get('email');
  const confirmEmail = c.get('confirmEmail');

  if (email.pristine || confirmEmail.pristine) {
    return null;
  }

  if (email.value !== confirmEmail.value) {
    return { 'match': true };
  }

  return null;
}

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();
  emailMessage: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, { validator: emailMatcher }),
      phone: '',
      notification: 'email',
      rating: [ null, ratingRange(1, 5)],
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

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }



}
