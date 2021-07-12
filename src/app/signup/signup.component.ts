import { Component, Inject, Input, OnInit } from '@angular/core';
import { Chatroom } from '../user';
import { HttpClient } from '@angular/common/http';
import { NgWizardConfig, NgWizardService,StepChangedArgs,STEP_STATE, THEME } from 'ng-wizard';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxFileUploadRequest, NgxFileUploadStorage, NgxFileUploadOptions, NgxFileUploadFactory } from '@ngx-file-upload/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

import { CustomValidatorService } from './custom-validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  get registerFormControl() : { [key: string]: AbstractControl }  {
    return this.signupForm.controls;
  }

  get firstname() {
    return this.signupForm.get('firstname');
    }
  get lookingFor() {
    return this.signupForm.get('lookingFor');
  }
  get lastname() {
    return this.signupForm.get('lastname');
  }
  get bio() {
    return this.signupForm.get('bio');
  }
  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get relationship() {
    return this.signupForm.get('relationship');
  }
  get known() {
    return this.signupForm.get('known');
  }
  get workAs() {
    return this.signupForm.get('workAs');
  }

  get haveKids() {
    return this.signupForm.get('haveKids');
  }
  get smoke() {
    return this.signupForm.get('smoke');
  }
  get drink() {
    return this.signupForm.get('drink');
  }

  get languages() {
    return this.signupForm.get('languages');
  }
  get hair() {
    return this.signupForm.get('hair');
  }

  get eyes() {
    return this.signupForm.get('eyes');
  }
  get occupation() {
    return this.signupForm.get('occupation');
  }

  get gender() {
    return this.signupForm.get('gender');
  }

  get height() {
    return this.signupForm.get('height');
  }
  get age() {
    return this.signupForm.get('age');
  }

  get country() {
    return this.signupForm.get('country');
  }
  get bodyType() {
    return this.signupForm.get('bodyType');
  }
  get interests() {
    return this.signupForm.get('interests');
  }
  get liveIn() {
    return this.signupForm.get('liveIn');
  }

  get education() {
    return this.signupForm.get('education');
  }


  constructor(
    @Inject(NgxFileUploadFactory) private uploadFactory: NgxFileUploadFactory,
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private customValidator:CustomValidatorService,
    private formBuilder :FormBuilder,
    private ngWizardService: NgWizardService,
  ) {}
  userSignupModel = new Chatroom();
  genderHasError = true;
  sex = ['Male', 'Female'];
  submitted = false;
  message: any;
   signupForm: FormGroup;

  public uploads: NgxFileUploadRequest[] = [];

  private storage: NgxFileUploadStorage;

  private uploadOptions: NgxFileUploadOptions;

  // charecter counter
  @Input()
  maxNumberOfCharactersBio = 1800;
  numberOfCharactersBio = 0;

  counters = true;


  numberOfCharacters1 = 0;
  interaction = {
    textValue: ''
  };

  imageChangedEvent: any = '';
  croppedImage: any = '';

  baseurl = 'https://lovecupid.herokuapp.com/api';


  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden,
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots
  };

  ngOnInit() {
    this.storage = new NgxFileUploadStorage({
      concurrentUploads: 2,
      autoStart: true,
      removeCompleted: 5000 // remove completed after 5 seconds
    });


    this.storage.change()
    .subscribe(uploads => this.uploads = uploads);

    this.signupForm = this.formBuilder.group({

      firstname:  ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)] )],
      lastname:   ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      username:   ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      // tslint:disable-next-line:max-line-length
      password:   ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20),this.customValidator.patternValidator()])],
      confirmPassword:   ['', Validators.compose([Validators.required ])],
      email:   ['', Validators.required, Validators.email],
      bodyType:  ['', Validators.required ],
      height:['', Validators.compose([Validators.required])],
      eyes:  ['', Validators.required ],
      gender:   ['', Validators.required ],
      hair:  ['', Validators.required ],
      interests:  ['', Validators.required ],
      languages:  ['', Validators.required ],
      relationship:  ['', Validators.required ],
      country:   ['', Validators.required ],
      known:   ['', Validators.compose([Validators.required])],
      workAs:   ['', Validators.required ],
      lookingFor:  ['', Validators.required ],
      liveIn:  ['', Validators.required ],
      bio:  ['', Validators.compose([Validators.required, Validators.minLength(200), Validators.maxLength(1800)])],
      haveKids:  ['', Validators.required ],
      age:  ['', Validators.compose([Validators.required])],
      smoke :  ['', Validators.required ],
      drink : ['', Validators.required ],
      education : ['', Validators.required ]
    },{
      validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
    }
    );


  }


  onModelChange(textValue: string): void {
    this.numberOfCharactersBio= textValue.length;
  }


  signup() {

const url= this.baseurl+'/signup?email='+this.email.value+
'&drink='+this.drink.value+
'&smoke='+this.smoke.value+
'&haveKids='+this.haveKids.value+
'&bio='+this.bio.value+
'&lookingFor='+this.lookingFor.value+
'&workAs='+this.workAs.value+
'&relationship='+this.relationship.value+
'&password='+this.password.value+
'&hair='+this.hair.value+
'&age='+this.age.value+
'&liveIn='+this.liveIn.value+
'&known='+this.known.value+
'&eyes='+this.eyes.value+
'&country='+this.country.value+
'&gender='+this.gender.value+
'&bodyType='+this.bodyType.value+
'&education='+this.education.value+
'&height='+this.height.value+
'&interests='+this.interests.value+
'&lastName='+this.lastname.value+
'&username='+this.username.value+
'&firstName='+this.firstname.value+
'&languages='+this.languages.value;

this.uploadOptions = { url: this.baseurl + '/upload?email=' + this.email.value };

    this.httpClient.post(url,{}).subscribe(data => {
      this.toastr.success('Signup complete');


    },(err)=>{this.toastr.error('failed');});
    this.submitted = true;


  }


  validateGender(value) {
    if (value === 'default') {
      this.genderHasError = true;
    } else {
      this.genderHasError = false;
    }
  }

  public onSelect(event) {
    const addedFiles: File[] = event.addedFiles;

    if (addedFiles.length) {
      const uploads = this.uploadFactory.createUploadRequest(addedFiles, this.uploadOptions);
      this.storage.add(uploads);
      console.log(uploads);

    }
  }

  public onRemove(upload: NgxFileUploadRequest) {
    this.storage.remove(upload);
  }

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }



  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }

  counter(i: number) {
    return new Array(i);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(this.croppedImage);
}
imageLoaded(image: LoadedImage) {

    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}
  // public doSignup(){
  //  let response = this.service.createUser(this.userSignupModel);
  //   response.subscribe((data) => this.message = data);

  // }
}
function forbiddenNameValidator(arg0: RegExp): any {
  throw new Error('Function not implemented.');
}

