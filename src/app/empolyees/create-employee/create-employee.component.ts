import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms"
import { Department } from "../../models/department.model"
import { Employee } from "../../models/employee.model"
import { ListEmployeeService } from "../../services/list-employee.service"
import { Router, ActivatedRoute } from "@angular/router"
// Import BsDatepickerConfig type. This is the Config object for datepicker. Using this
// config object we can set minDate, maxDate, whether to show/hide week numbers and
// change the color theme using the containerClass property.
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  //When you use Router you no need to specify selector
  // selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
   panelTitle : string;
  // If you want to default radio box :checked target that lable and assign radio value
  //gender = "male";
  // create a property of type Partial<BsDatepickerConfig>
  IsphotoView: boolean = false;
  //  creating a ViewChild with template reference varaible to access form-->ngForm to check wheather form is dirty or not
  // @ViewChild('pass template reference varaible of the form ') public() NameofVariable : Type(Note here Ng is captial)
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  editId: number;
  datePickerConfig: Partial<BsDatepickerConfig>;
  employee: Employee = {
    id: null,
    name: null,
    gender: null,
    email: null,
    phoneNumber: null,
    contactPreference: null,
    dateOfBirth: null,
    department: 'select',
    isActive: null,
    photoPath: null,
    // password: null,
    // confirmPassword: null,
  }
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ]

  constructor(private _employeeService: ListEmployeeService, private _router: Router, private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: "theme-dark-blue",
        showWeekNumbers: false,
        // Here january statrts from 0
        minDate: new Date(2019, 0, 1),
        maxDate: new Date(2019, 11, 31),
        dateInputFormat: "DD/MM/YYYY"
      })
  }

  ngOnInit() {
    this._route.paramMap.subscribe((parameterMap) => {
      const id = +parameterMap.get('id')
      this.getEmployee(id);
    });
  }
  // get details of employee during edit event
  private getEmployee(id: number) {
    this.panelTitle = "Create Employee"
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        email: null,
        phoneNumber: null,
        contactPreference: null,
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null,
      }
      this.createEmployeeForm.reset();
    }
    else {
      this.panelTitle = "Edit Employee"
      this.employee = Object.assign({}, this._employeeService.getEmployee(id)); 
    }
  }
  // Initally we are using ANgular Generated Form Model but now it's not required
  // saveEmployee(employee: NgForm): void {
  //   console.log(employee.value)
  // }
  // Now we dont need to pass newEmployee arugment since this.employee is collected
  // saveEmployee(newEmployee: Employee): void {
  //   console.log(newEmployee)
  // }

  // saveEmployee(): void {
  //   this._employeeService.saveEmployees(this.employee);
  //   this._router.navigate(['list']);
  // }

  // saveEmployee(empForm : NgForm): void {
  //   this._employeeService.saveEmployees(this.employee);
  //   empForm.reset();
  //   this._router.navigate(['list']);
  // }
  // Other approach
  saveEmployee(empForm: NgForm): void {
    //The reason for creating new varaible bcoz since we are using 2 way binding when using this.createEmployeeForm.reset(); it will reset the complete form and employee object will be set to null : In order slove this issue we created a new object
    var newEmployee: Employee = Object.assign({}, this.employee)
    this._employeeService.saveEmployees(newEmployee);
    this.createEmployeeForm.reset();
    this._router.navigate(['list']);
  }

  TogglePhotoView() {
    // console.log(this.IsphotoView);
    this.IsphotoView = !this.IsphotoView
    // this.IsphotoView = employee.value.photoPath === undefined || employee.value.photoPath === null? false : true
    // console.log(this.IsphotoView);
    // this.IsphotoBtnState = !this.IsphotoView ? "Show PhotoView" : "Hide PhotView"
  }
}