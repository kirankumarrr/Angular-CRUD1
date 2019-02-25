import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
  selector: '[appConfirmEqualValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,// An InjectionToken for registering additional synchronous validators used with AbstractControls

      //NG_ASYNC_VALIDATORS : check about this as well
      useExisting: ConfirmEqualValidatorDirective,
      multi: true//Adding the validator to the existing collection of validators requires the multi: true option.
    }
  ]
})
// export class ConfirmEqualValidatorDirective implements Validator {
//   @Input() appConfirmEqualValidator: string;
//   validate(control: AbstractControl): {[key:string]: any} | null {

//     const PasswordControler = control.parent.get(this.appConfirmEqualValidator);

//     if(PasswordControler && PasswordControler.value!==control.value){
//       return {'notEqual' : true}
//     }
//     return null
//   }
//   constructor() { }

// }
export class ConfirmEqualValidatorDirective implements Validator {
  validate(passwordGroup: AbstractControl): { [key: string]: any } | null {

    const passwordField = passwordGroup.get("password");
    const confirmPasswordField = passwordGroup.get("confirmPassword");

    if (passwordField && confirmPasswordField && passwordField.value !== confirmPasswordField.value) {
      return { 'notEqual': true }
    }
    return null
  }
  constructor() { }

}

// NgModelGroup Directive:
//  Use to create a sub-group within a form
//  usedful to validate a sub-group of elements on the form
//  useful to group properties of the form model in to a  nested object
//  the name of the ngModelGroup will become the key for nested object in the form model
//  the ngModelGroup directive can only be used as a child of Ngform validations