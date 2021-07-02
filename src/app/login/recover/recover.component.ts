import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
})
export class RecoverComponent implements OnInit {
  baseurl = 'https://lovecupid.herokuapp.com/api';
  public retypePassword;
  public newPasword;
  passwordForm: FormGroup;
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  get changePassword() {
    return this.passwordForm.controls;
  }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      newPassword: new FormControl(['', Validators.required, Validators.minLength(6), Validators.minLength(15)]),
      password: new FormControl(['', Validators.required, Validators.minLength(6), Validators.minLength(15)]),
    });
  }

  recoverAccount() {
    this.spinner.show();
    const url = this.baseurl + '/recover';
    this.httpClient.post(url, {}).subscribe(data => {
      this.spinner.hide();
      this.toastr.show('success', 'Please check your email');
    });
  }
}
