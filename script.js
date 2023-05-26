                        //Create Student Service//



import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:5000'; // Update with your backend API URL

  constructor(private http: HttpClient) { }

  getStudents(page: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.http.get(`${this.baseUrl}/students`, { params });
  }

  filterStudents(criteria: string): Observable<any> {
    let params = new HttpParams().set('criteria', criteria);

    return this.http.get(`${this.baseUrl}/students/filter`, { params });
  }




                      //Student Component//




  import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: any[] = [];
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  filterControl = new FormControl('');

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();

    this.filterControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(criteria => {
        this.filterStudents(criteria);
      });
  }

  getStudents(): void {
    this.studentService.getStudents(this.page, this.pageSize)
      .subscribe(response => {
        this.students = response;
      });
  }

  filterStudents(criteria: string): void {
    this.studentService.filterStudents(criteria)
      .subscribe(response => {
        this.students = response;
      });
  }
}





            //
