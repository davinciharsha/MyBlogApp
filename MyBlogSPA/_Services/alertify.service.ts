import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(message: string, okCallback: () => any): void {
    alertify.confirm(message, (e: any) => {
      if (e) {
        okCallback();
      }
    });
  }

  success(message: string): void {
    alertify.success(message);
  }

  warning(message: string): void {
    alertify.warning(message);
  }

  error(message: string): void {
    alertify.error(message);
  }
}
