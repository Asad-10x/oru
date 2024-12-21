import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasksUrl = 'http://localhost:5000/api/v1/tasks/getAll';

  constructor(private http: HttpClient) {}

  fetchTasks(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass token from local storage
    });

    return this.http.get(this.tasksUrl, { headers });
  }
}
