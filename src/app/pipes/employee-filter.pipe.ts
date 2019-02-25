import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from "../models/employee.model"
@Pipe({
  name: 'employeeFilter',
  pure: false // If you use impure pipe it calls everytime and page render which lead unneccessary of performance  
})
export class EmployeeFilterPipe implements PipeTransform  {

  transform(employees: Employee[], SearchTerm: string): Employee[] {
    if (!employees || !SearchTerm) {
      return employees;
    }

    return employees.filter(employee => employee.name.toLocaleLowerCase().indexOf(SearchTerm.toLocaleLowerCase()) !== -1)
  }

}

//Pipes are fast but filtering and sort may not work as expected if the source data is updated without a change to the object reference