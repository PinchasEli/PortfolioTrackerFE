import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(message: string, ...optionalParams: any[]): void {
    if (!environment.production) {
      console.log(message, ...optionalParams);
    }
  }

  error(message: string, ...optionalParams: any[]): void {
    if (!environment.production) {
      console.error(message, ...optionalParams);
    }
  }

  warn(message: string, ...optionalParams: any[]): void {
    if (!environment.production) {
      console.warn(message, ...optionalParams);
    }
  }

  debug(message: string, ...optionalParams: any[]): void {
    if (!environment.production) {
      console.debug(message, ...optionalParams);
    }
  }
}
