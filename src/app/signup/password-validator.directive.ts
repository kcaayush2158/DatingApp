import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[compare]',
  providers:[
  {
    provide :NG_VALIDATORS,
    useExisting: PasswordValidatorDirective,
    multi:true
  }
  ]
})

export class PasswordValidatorDirective {
  @Input('compare') appPasswordValidator : string;


   validate(control:AbstractControl): ValidationErrors| null {
    if(control.value === null || control.value.length === 0){
      return null; //dont validate input value
    }
       const controlToCompare = control.parent.get(this.appPasswordValidator);
          if(controlToCompare){
              const subcription = controlToCompare.valueChanges.subscribe(()=>{
              control.updateValueAndValidity();
               subcription.unsubscribe();
              })
          }
     return controlToCompare && controlToCompare.value !== control.value ? { 'compare' : true } : null;
    }
}