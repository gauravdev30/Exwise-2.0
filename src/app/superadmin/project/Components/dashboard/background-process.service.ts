import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundProcessService {

  constructor() { }

  private backgroundProcessSubject = new BehaviorSubject<boolean>(false);
  backgroundProcess$ = this.backgroundProcessSubject.asObservable();

  showBackgroundMessage() {
    this.backgroundProcessSubject.next(true);
  }

  hideBackgroundMessage() {
    this.backgroundProcessSubject.next(false);
  }
}
