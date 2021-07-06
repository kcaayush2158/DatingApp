import { Component, Inject, OnInit } from '@angular/core';
import { Chatroom } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgWizardConfig, NgWizardService, StepChangedArgs, STEP_STATE, THEME } from 'ng-wizard';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxFileUploadRequest, NgxFileUploadStorage, NgxFileUploadOptions, NgxFileUploadFactory } from '@ngx-file-upload/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userSignupModel = new Chatroom();
  genderHasError = true;
  sex = ['Male', 'Female'];
  submitted = false;
  message: any;
  signupForm: FormGroup;

  public uploads: NgxFileUploadRequest[] = [];

  private storage: NgxFileUploadStorage;

  private uploadOptions: NgxFileUploadOptions;


  baseurl = 'http://localhost:8081/api';

  get registerFormControl() {
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
  get repassword() {
    return this.signupForm.get('repassword');
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
    private ngWizardService: NgWizardService,
  ) {}

  ngOnInit() {
    this.storage = new NgxFileUploadStorage({
      concurrentUploads: 2,
      autoStart: true,
      removeCompleted: 5000 // remove completed after 5 seconds
    });

    
    this.storage.change()
    .subscribe(uploads => this.uploads = uploads);

    this.signupForm = new FormGroup({

      username: new FormControl(''),
      firstname:  new FormControl(''),
      lastname:  new FormControl(''),
      repassword:  new FormControl(''),
      password:   new FormControl(''),
      email:  new FormControl(''),
      bodyType:  new FormControl(''),
      height:  new FormControl(''),
      eyes:  new FormControl(''),
      gender:  new FormControl(''),
      hair:  new FormControl(''),
      interests:  new FormControl(''),
      languages:  new FormControl(''),
      relationship:  new FormControl(''),
      country:   new FormControl(''),
      known:  new FormControl(''),
      workAs:   new FormControl(''),
      lookingFor:  new FormControl(''),
      liveIn:  new FormControl(''),
      bio:  new FormControl(''),
      haveKids:  new FormControl(''),
      age:  new FormControl(''),
      education:  new FormControl(''),
      smoke:  new FormControl(''),
      drink: new FormControl(''),
    });

 
    this.uploadOptions = { url: this.baseurl + '/upload?email=' + this.email };
  }



  signup() {

const url= this.baseurl+'/signup?email='+this.email.value+
'&drink='+this.drink.value+
'&smoke='+this.smoke.value+
'&haveKids='+this.haveKids.value+
'&bio='+this.bio.value+
'&lookingFor='+this.lookingFor.value+
'&workAs='+this.workAs.value+
'&country='+this.country.value+
'&relationship='+this.relationship.value+
'&password='+this.password.value+
'&hair='+this.hair.value+
'&age='+this.age.value+
'&known='+this.known.value+
'&eyes='+this.eyes.value+
'&liveIn='+this.liveIn.value+
'&gender='+this.gender.value+
'&bodyType='+this.bodyType.value+
'&education='+this.education.value+
'&height='+this.height.value+
'&interests='+this.interests.value+
'&lastName='+this.lastname.value+
'&username='+this.username.value+
'&firstName='+this.firstname.value+
'&languages='+this.languages.value;

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


  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden,
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    toolbarSettings: {
      toolbarExtraButtons: [
        {
          text: 'Finish',
          class: 'btn btn-info',
          event: () => {
            console.log('finished');
          },
        },
      ],
    },
  };

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

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
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
  // public doSignup(){
  //  let response = this.service.createUser(this.userSignupModel);
  //   response.subscribe((data) => this.message = data);

  // }
}
