import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isFormSubmitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['',
        [
          Validators.required,
          // Validators.pattern(passwordPattern),
          // Validators.minLength(8),
          // Validators.maxLength(20)
        ]
      ]
    })
  }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.loginForm.value)
    this.isFormSubmitted = true;
    if (this.loginForm.invalid) return;
    this.spinner.show();
    const dataForm = {
      username: this.loginForm.value.userName,
      password: this.loginForm.value.password
    };
    console.log(JSON.stringify(dataForm))
    const data = JSON.stringify(dataForm);
    this.authService.logIn(data).subscribe((res: any) => {
      this.spinner.hide();
      if (res.token) {
        this.router.navigate(['/products'])
      }
    }, err => {
      console.log(err)
      this.toastr.error(err.error, 'Error')
    })
  }
}
