import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ListEmployeesComponent } from "./empolyees/list-employees/list-employees.component";
import { CreateEmployeeComponent } from "./empolyees/create-employee/create-employee.component";
// Importing Third Party Date Picker form ngx-bootstrap
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { SelectRequiredValidatorDirective } from "./shared/select-required-validator.directive";
import { ConfirmEqualValidatorDirective } from "./shared/confirm-equal-validator.directive";
import { ListEmployeeService } from "./services/list-employee.service";
import { DisplayEmployeesComponent } from "./empolyees/display-employees/display-employees.component";
import { CreateEmployeeCanDeactivateGuardService } from "./empolyees/create-employee-can-deactivate-guard.service";
import { EmployeeDetailsComponent } from "./empolyees/employee-details/employee-details.component";
import { EmployeeListResolverService } from "./services/employee-list-resolver.service";
import { PageNotFoundComponent } from "./empolyees/page-not-found/page-not-found.component";
import { EmployeeDetailGuardService } from "./services/employee-detail-guard.service";
import { AccordionComponent } from "./shared/accordion/accordion.component";
import { HttpClientModule } from "@angular/common/http";
const appRoutes: Routes = [
  {
    path: "list",
    component: ListEmployeesComponent,
    resolve: { employeeList: EmployeeListResolverService }
  },
  {
    path: "edit/:id",
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
  {
    path: "employee/:id",
    component: EmployeeDetailsComponent,
    canActivate: [EmployeeDetailGuardService]
  },
  {
    path: "",
    redirectTo: "/list",
    pathMatch: "full"
  },
  {
    path: "notfound",
    component: PageNotFoundComponent
  }
];
//RouterModule.forRoot
//RouterModule.forChild
//Learn about this
//RouterModule.forRoot(appRoutes,{enableTracing:true})
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeesComponent,
    EmployeeDetailsComponent,
    PageNotFoundComponent,
    AccordionComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    ListEmployeeService,
    CreateEmployeeCanDeactivateGuardService,
    EmployeeListResolverService,
    EmployeeDetailGuardService
  ]
})
export class AppModule {}
