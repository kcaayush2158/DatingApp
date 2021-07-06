import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { PasswordChange } from './settings';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxFileUploadStorage, NgxFileUploadFactory, NgxFileUploadOptions, NgxFileUploadRequest } from '@ngx-file-upload/core';
import { Gallery } from 'angular-gallery';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  users: any = [];
  formChangePassword: FormGroup;
  passwordChange = new PasswordChange();

  //file uploader
  uploads: NgxFileUploadRequest[] = [];
  storage: NgxFileUploadStorage;
  uploadOptions: NgxFileUploadOptions;
  baseurl = 'https://lovecupid.herokuapp.com/api';

  constructor(
    @Inject(NgxFileUploadFactory) private uploadFactory: NgxFileUploadFactory,
    private gallery: Gallery,
    private localStorage: LocalStorageService,
    private formBuilder: FormBuilder,
    private tostr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private http: HttpClient
  ) {
    this.storage = new NgxFileUploadStorage({
      concurrentUploads: 1,
      autoStart: true,
      removeCompleted: 1000, // remove completed after 5 seconds
    });
  }

  ngOnInit(): void {
    this.users = this.localStorage.retrieve('user');

    this.storage.change().subscribe(uploads => {
      this.uploads = uploads;
      this.tostr.success('Profile Picture Changed ');
      this.spinner.hide();
    });

    this.uploadOptions = { url: this.baseurl + '/upload?email=' + this.users.email };

    this.formChangePassword = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(5), Validators.required, Validators.maxLength(20)]],
      newPassword: ['', [Validators.required, Validators.minLength(5), Validators.required, Validators.maxLength(20)]],
    });
  }

  get registerFormControl() {
    return this.formChangePassword.controls;
  }

  get oldPassword() {
    return this.formChangePassword.get('oldPassword');
  }

  get newPassword() {
    return this.formChangePassword.get('newPassword');
  }

  changePassword() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const user = this.localStorage.retrieve('user');
    const url =
      this.baseurl +
      '/settings/password/save?oldPassword=' +
      this.oldPassword.value +
      '&password=' +
      this.newPassword.value +
      '&email=' +
      user.email;
    this.spinner.show();

    this.http.post(url, { headers: headers }).subscribe(
      data => {
        if (data == 1) {
          this.spinner.hide();
          this.tostr.success('Success', 'Password has been changed successfully');
        } else {
          this.tostr.error('Error', 'BAD CREDENTIALS');
        }
      },
      err => this.tostr.error('error', 'Failed to changed password')
    );
  }

  deleteProfile() {
    const user = this.localStorage.retrieve('user');
    const url = this.baseurl + '/profile/delete?email=' + user.email;
    this.spinner.show();
    this.http.post(url, {}).subscribe(
      data => {
        if (data != null) {
          this.spinner.hide();
          this.router.navigate['/logout'];
          this.tostr.success('Success', 'Profile has been changed successfully');
        } else {
          this.tostr.error('Error', 'Unable to delete the profile');
        }
      },
      err => this.tostr.error('error', 'Failed to delete  Profile')
    );
  }

  public onSelect(event) {
    const addedFiles: File[] = event.addedFiles;
    if (addedFiles.length) {
      const uploads = this.uploadFactory.createUploadRequest(addedFiles, this.uploadOptions);
      this.storage.add(uploads);
    }
  }

  public onRemove(upload: NgxFileUploadRequest) {
    this.storage.remove(upload);
  }
}
