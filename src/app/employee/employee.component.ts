import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  constructor (public service : EmployeeService) {}

  ngOnInit(): void {
    this.service.fetchEmployeeList();
  } 

  populateForm(selectedRecord : Employee) {
    this.service.employeeForm.setValue({
      _id: selectedRecord._id,
      fullName: selectedRecord.fullName,
      position: selectedRecord.position,
      location: selectedRecord.location,
      salary: selectedRecord.salary,
    })
  }

  onDelete(_id : string) {
    if (confirm('Are you sure to delete this record'))
    {
      this.service.deleteEmployee(_id).subscribe(res => {
        this.service.fetchEmployeeList();
        
      })
    }
  }

}
