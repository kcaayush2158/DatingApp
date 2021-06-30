import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgxFileUploadRequest, NgxFileUploadStorage, NgxFileUploadOptions, NgxFileUploadFactory } from '@ngx-file-upload/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  user;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  photos: any = [];
  photoType: any;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  file: string;

  public uploads: NgxFileUploadRequest[] = [];
  private storage: NgxFileUploadStorage;
  private uploadOptions: NgxFileUploadOptions;

  baseurl = 'https://lovecupid.herokuapp.com/api';

  constructor(
    @Inject(NgxFileUploadFactory) private uploadFactory: NgxFileUploadFactory,
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private localStorage: LocalStorageService,
    private spinner: NgxSpinnerService,
    private tostr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.localStorage.retrieve('user');

    this.storage = new NgxFileUploadStorage({
      concurrentUploads: 1,
      autoStart: true,
      removeCompleted: 5000, // remove completed after 5 seconds
    });

    this.storage.change().subscribe(uploads => {
      console.log('success');
      this.uploads = uploads;
      this.tostr.success('Profile Picture Changed ');
      this.spinner.hide();
    });

    this.loadPhotos();
  }

  loadPhotos() {
    const params = {
      email: this.user.email,
    };

    this.spinner.show();
    var url = this.baseurl + '/principal/user/photo';
    this.httpClient.get(url, { params }).subscribe(data => {
      this.photos = data;
      console.log(data);
      this.spinner.hide();
    });
  }

  public onSelect(event) {
    const addedFiles: File[] = event.addedFiles;

    if (addedFiles.length) {
      const uploads = this.uploadFactory.createUploadRequest(addedFiles, this.uploadOptions);
      this.storage.add(uploads);
    }
    this.uploadOptions = { url: this.baseurl + '/user/p/upload?email=' + this.user.email };
    this.loadPhotos();
  }

  public onRemove(upload: NgxFileUploadRequest) {
    this.storage.remove(upload);
    this.loadPhotos();
  }

  updatePhotoType(id: number) {
    const params = {
      photoType: this.photoType,
      email: this.user.email,
    };

    const url = this.baseurl + '/photo/' + id + '/update';
    this.httpClient.post(url, { params }).subscribe(
      data => {
        this.toastr.success('saved');
      },
      err => {
        this.toastr.error('failed to save');
      }
    );
  }

  deleteImage(id: number) {
    const params = {
      id: id,
      email: this.user.email,
    };
    const url = this.baseurl + '/photos/delete';
    this.httpClient.delete(url, { params }).subscribe(
      data => {
        this.toastr.success('Photo deleted');
        this.loadPhotos();
      },
      err => {
        this.toastr.error('unable to delete photo');
      }
    );
  }
}
