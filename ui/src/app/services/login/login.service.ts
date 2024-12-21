import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
    private loginUrl = 'http://localhost:5000/api/v1/users/login';


    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<any> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
        return this.http.post(this.loginUrl, { email, password }, { headers });
      }

}
