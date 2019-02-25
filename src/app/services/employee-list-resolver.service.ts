import { Injectable } from '@angular/core';
import { Employee } from "../models/employee.model";
import { Observable, of } from 'rxjs';
import { ListEmployeeService } from './list-employee.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
@Injectable()
// note :
// here we are not subscribing to observable method
//If you want data in components you need to make sure that should subscribe to observable
// but since it is resolver it automatically subscribes to Observables
export class EmployeeListResolverService implements Resolve<Employee[]>{
  constructor(private _employeeService: ListEmployeeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
    return this._employeeService.getEmployees();
  }

} 