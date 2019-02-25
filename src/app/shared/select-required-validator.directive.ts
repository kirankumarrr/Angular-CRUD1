import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
//This custome validator is created in Template Driven FORM MODEL


@Directive({
  selector: '[appSelectRequiredValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,// An InjectionToken for registering additional synchronous validators used with AbstractControls

      //NG_ASYNC_VALIDATORS : check about this as well
      useExisting: SelectRequiredValidatorDirective,
      multi: true//Adding the validator to the existing collection of validators requires the multi: true option.

    }
  ]
})
export class SelectRequiredValidatorDirective implements Validator {
  //Reading Input value which is  passed with custome Validator attribute

  //changing the name as i wanted
  @Input('appSelectRequiredValidator') defaultValue: string;
  // @Input() appSelectRequiredValidator: string;
  validate(control: AbstractControl): { [key: string]: any } | null {
    // return control.value === this.appSelectRequiredValidator ? { 'defaultSelected': true } : 
    return control.value === this.defaultValue ? { 'defaultSelected': true } : null
  }
  constructor() { }

}