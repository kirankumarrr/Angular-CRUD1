import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { ListEmployeeService } from './list-employee.service';
@Injectable()
export class EmployeeDetailGuardService implements CanActivate {
  constructor(private _employeeService: ListEmployeeService,
    private _route: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //!! -->this will convert to Boolean
    const employeExist = !!this._employeeService.getEmployee(+route.paramMap.get('id'))
    if (employeExist) {
      return true;
    }
    else {
      this._route.navigate(['notfound'])
      return false;
    }
  }
}
//The reason created this page is when you navigate undefined user then it should redirect to notfound page
