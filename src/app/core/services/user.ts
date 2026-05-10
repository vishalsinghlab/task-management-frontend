import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/users`;

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getTeamMembers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/team`);
  }

  assignEmployee(employeeId: string, teamLeadId: string) {
    return this.http.patch(`${this.apiUrl}/${employeeId}/assign-team-lead`, {
      teamLeadId,
    });
  }
}
