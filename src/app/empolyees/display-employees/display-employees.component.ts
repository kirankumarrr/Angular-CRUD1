// import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
// working on property setter
//import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from "../../models/employee.model"
import { ActivatedRoute, Router } from "@angular/router"
import { ListEmployeeService } from "../../services/list-employee.service"
@Component({
  selector: 'app-display-employees',
  templateUrl: './display-employees.component.html',
  styleUrls: ['./display-employees.component.css']
})
// export class DisplayEmployeesComponent implements OnInit, OnChanges {
// export class DisplayEmployeesComponent implements OnInit{
//   // @Input() employee: Employee;
//   // constructor() { }

//   // ngOnInit() {
//   // }
//   // ngOnChanges(changes: SimpleChanges) {
//   //  // console.log(changes)
//   //   const PreviousEmployeeName = <Employee>  changes.employee.previousValue; 
//   //   const CurrentEmployeeName = <Employee>  changes.employee.currentValue;
//   //   console.log("PreviousEmployeeName " + (PreviousEmployeeName ? PreviousEmployeeName.name : "NULL"));
//   //   console.log(`CurrentEmployeeName ${CurrentEmployeeName.name}`);
//   // }

//   private _employee : Employee;
//   @Input() 
//   set employee(val: Employee){
//     console.log("Previous Name " +(this._employee ? this._employee.name : "NULL"));
//     console.log("Current  Name " + val.name);
//     this._employee = val;
//   }
//   get employee () : Employee {
//     return this._employee
//   }
//   constructor() { }

//   ngOnInit() {
//   }

// }



export class DisplayEmployeesComponent implements OnInit {
  @Input() employee: Employee;
  @Input() searchTerm: string;
  @Output() notify = new EventEmitter<string>();
  @Output() notifyDeleteEmployee = new EventEmitter<number>();
  @Output() ViewParentEmployeeEvent = new EventEmitter<number>();
  confirmDelete: boolean = false;
  ishidden : boolean ;
  private selectedEmpolyeeId: number;
  constructor(private _route: ActivatedRoute, private _router: Router, private _employeeList: ListEmployeeService) { }

  ngOnInit() {
    this.selectedEmpolyeeId = +this._route.snapshot.paramMap.get('id');

  }
  ChildClickEventListener(name) {
    this.notify.emit(name);
  }
  getNameAndGender(): string {
    return this.employee.name + " " + this.employee.gender;
  }
  //   ViewEmployee(id){
  //   this.ViewParentEmployeeEvent.emit(id);
  // }
  // without using emitter
  ViewEmployee(id) {
    this._router
      .navigate(
        ["/employee", id],
        {
          queryParams: {
            'searchTerm': this.searchTerm
          }
        }
      );
  }
  editEmployee() {
    this._router
      .navigate(
        ["/edit", this.employee.id]
      );
  }
  deleteEmployee(id: number) {
    this._employeeList.deleteEmployee(id);
    this.notifyDeleteEmployee.emit(id);
  }
  DeleteFailed() {
    this.confirmDelete = false;
  }
  deleteInitiated() {
    this.confirmDelete = true;
  }
}