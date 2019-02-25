import { Component, OnInit } from '@angular/core';
import { Employee } from "../../models/employee.model"
// import { ListEmployeeService } from "../../services/list-employee.service"
import { Router, ActivatedRoute } from "@angular/router"
@Component({
  //When you use Router you no need to specify selector
  // selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: Employee[];
  filteredEmployees: Employee[];
  filteredEmployeeNotFound: boolean = false;
  name: string;
  private _searchTerm: string;
  get searchTerm() {
    return this._searchTerm
  }
  set searchTerm(value: string) {
    this._searchTerm = value
    this.filteredEmployees = this.filterEmployees(value)

  }
  filterEmployees(searchTerm: string) {
    return this.employees.filter((employee) => {
      if (employee.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1) {
        return employee.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1
      } else { this.filteredEmployeeNotFound = true; }

    })
  }
  // employeeToDisplay : Employee;
  // private employeeArrayIndex = 0;
  constructor(
    // private _listEmployees: ListEmployeeService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.employees = this._route.snapshot.data["employeeList"];
    // console.log(this.employees)
    if (this._route.snapshot.queryParamMap.has('searchTerm') !== false) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm')
    }
    else {
      this.filteredEmployees = this.employees;
    }
  }

  ngOnInit() {
    // this.employees = this._listEmployees.getEmployees();
    // this._listEmployees.getEmployees().subscribe((employlist) => {
    //   this.employees = employlist
    //   this.filteredEmployees = this.employees;
    //   if (this._route.snapshot.queryParamMap.has('searchTerm') !== false) {
    //     this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm')
    //   }
    // })

    // this.employeeToDisplay = this.employees[0]
    // Reading Parameters
    // queryParamMap are used when its Query Route Params
    // console.log(this._route.snapshot.queryParamMap.has('searchTerm'));
    // console.log(this._route.snapshot.queryParamMap.get('searchTerm'));
    // console.log(this._route.snapshot.queryParamMap.getAll('searchTerm'));
    // console.log(this._route.snapshot.queryParamMap.keys);
    // // paramMap are used when its Required or Optional Route Params
    // console.log(this._route.snapshot.paramMap.has('id'));
    // console.log(this._route.snapshot.paramMap.get('id'));
    // console.log(this._route.snapshot.paramMap.keys);

  }

  // nextEmployeeToDisplay():void{
  //   if(this.employeeArrayIndex<2){
  //     this.employeeArrayIndex++;
  //     this.employeeToDisplay = this.employees[this.employeeArrayIndex];

  //   }
  //   else{
  //       this.employeeToDisplay = this.employees[0]
  //   }

  // }
  notify($event) {
    console.log(name)
    this.name = $event;
  }

  onclickNavigate(employeeId: number) {
    this._router
      .navigate(
        ["/employee", employeeId],
        {
          queryParams: {
            'searchTerm': this.searchTerm,
            'textParam': 'testValue'
          }
        }
      );
  }
  deleteEmployeeMethod(id: number) {
    const findIndex = this.filteredEmployees.findIndex(e => e.id == id);
    if (findIndex !== -1) {
      this.filteredEmployees.splice(findIndex, 1)
    }

  }
} 