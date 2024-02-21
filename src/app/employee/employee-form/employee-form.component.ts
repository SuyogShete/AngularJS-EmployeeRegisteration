import { Component } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { Employee } from '../../shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent {
  submitted: boolean = false;
  added: boolean = false;

  constructor(public service: EmployeeService, private toastr: ToastrService) {}

  onSubmit() {
    this.submitted = true;
    if (this.service.employeeForm.valid) {
      
        if (this.service.employeeForm.get('_id')?.value == '') {
          if (confirm('Are you sure you want to add this record')) {
          this.service.postEmployee().subscribe((res) => {
            this.service.fetchEmployeeList();

            this.resetForm();
          });
        }
      }
      else {
        if (confirm('Are you sure you want to update this record')) {
          this.service.putEmployee().subscribe((res) => {
            this.service.fetchEmployeeList();

            this.resetForm();
          });
        }
      }
    }
  }

  resetForm() {
    this.service.employeeForm.reset();
    this.submitted = false;
    setTimeout(() => {
      this.added = false;
    }, 2000);
  }
}
