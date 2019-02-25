import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ListEmployeeService } from "../../services/list-employee.service";
import { Employee } from "../../models/employee.model";
@Component({
  selector: "app-employee-details",
  templateUrl: "./employee-details.component.html",
  styleUrls: ["./employee-details.component.css"]
})
export class EmployeeDetailsComponent implements OnInit {
  private _id: number;
  employee: Employee;
  constructor(
    private _route: ActivatedRoute,
    private EmployeeService: ListEmployeeService,
    private _router: Router
  ) {}

  ngOnInit() {
    // Here its going to return string so using "+" we are converting it to number
    // params are depricated above angular4 : this can be used only in angular 2
    //const id = +this._route.snapshot.params['id'];

    //Using paramMap which is used in angualar4 and above
    //There is problem when we snapshot so we are using observables
    // the reason is that when we click next employee the data will receive but we are in ngOnInit:it will execute only when component is rendered
    //using observables this problem will be solved

    //  const id = +this._route.snapshot.paramMap.get('id');
    //  this.employee =  this.EmployeeService.getEmployee(id);

    // this._id = +this._route.snapshot.paramMap.get('id');
    // this.employee =  this.EmployeeService.getEmployee(this._id);

    //observables
    //If u are using angular 2  use ===? "param"
    //this._route.param.subscribe(params =>
    this._route.paramMap.subscribe(params => {
      this._id = +params.get("id");
      this.employee = this.EmployeeService.getEmployee(this._id);
    });
  }
  ViewNextEmpolyee() {
    if (this._id < 3) {
      this._id = this._id + 1;
    } else {
      this._id = 1;
    }

    this._router.navigate(["/employee", this._id]);
  }
}
