import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://task-management-1l3m.onrender.com');
  }

  listen(eventName: string) {
    return new Observable<any>((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
}
