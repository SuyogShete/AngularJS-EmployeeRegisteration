import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  readonly baseUrl = 'http://localhost:3000/api/employees/';

  list : Employee[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  employeeForm = this.fb.group({
    _id: [''],
    fullName: ['', Validators.required],
    position: ['', Validators.required],
    location: ['', Validators.required],
    salary: ['', Validators.required],
  });

  fetchEmployeeList() {
    this.http.get(this.baseUrl).pipe(catchError(this.errorHandler)).subscribe(data => {
      this.list = data as Employee[];
    })
  }

  postEmployee() {
    return this.http
      .post(this.baseUrl, this.employeeForm.value)
      .pipe(catchError(this.errorHandler));
  }

  putEmployee() {
    return this.http.put(this.baseUrl + this.employeeForm.get('_id')?.value, this.employeeForm.value)
    .pipe(catchError(this.errorHandler))
  }

  deleteEmployee(_id : string) {
    return this.http.delete(this.baseUrl+_id)
    .pipe(catchError(this.errorHandler))
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
