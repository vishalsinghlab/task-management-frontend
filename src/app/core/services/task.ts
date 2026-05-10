import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/tasks`;

  getTasks(status?: string): Observable<any> {
    let url = this.apiUrl;

    if (status) {
      url += `?status=${status}`;
    }

    return this.http.get(url);
  }

  createTask(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateTask(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  assignTask(id: string, assignedTo: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/assign`, { assignedTo });
  }
}
