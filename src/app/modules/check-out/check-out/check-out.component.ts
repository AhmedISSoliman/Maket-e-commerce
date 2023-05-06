import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CheckOutComponent implements OnInit {

  shippingMethodsForm!: FormGroup;
  detailsForm!: FormGroup;
  paymentMethodsForm!: FormGroup;
  noteForm!: FormGroup;
  allDetails!: FormGroup;

  isFormSubmitted: boolean = false;

  isLinear = false;

  cartItems$: Observable<any[]> | undefined;
  allAmount$: Observable<any> | undefined

  constructor(private cartService: CartService,
    private formBuilder: FormBuilder,
  ) {
    this.shippingMethodsForm = this.formBuilder.group({
      shippingMethod: ['', [Validators.required]],
    });
    this.detailsForm = this.formBuilder.group({
      country: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      streetAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      postCode: ['', [Validators.required, Validators.pattern('[0-9]*$')]],
      Phone: ['', [Validators.required, Validators.pattern(/[+][0-9]*$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.paymentMethodsForm = this.formBuilder.group({
      paymentMethod: ['', [Validators.required]],
    })
    this.noteForm = this.formBuilder.group({
      note: ['']
    })
  }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.currentCartItems$;
    this.allAmount$ = this.cartService.allAmountAction$;
  }

  submit() {
    this.isFormSubmitted = true;
    if (this.shippingMethodsForm.invalid || this.detailsForm.invalid || this.paymentMethodsForm.invalid) {
      return;
    }
    else {
      const formData = {
        ...this.shippingMethodsForm.value,
        ...this.detailsForm.value,
        ...this.paymentMethodsForm.value,
      }
      console.log(formData);
    }
  }
}
