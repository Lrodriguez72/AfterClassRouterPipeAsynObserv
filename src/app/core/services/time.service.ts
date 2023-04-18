import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private _reloj$ = new BehaviorSubject<Time>(this.currentTime);
  private alarmaEstablecida: Time | null = null;

  constructor() {
    setInterval(() => {
      this._reloj$.next(this.currentTime);
      this.verificarAlarma();
    }, 1000);
  }

  get reloj(): Observable<string> {
    return this._reloj$.asObservable()
      .pipe(
        map((time) => {
          return `${time.hours}:${time.minutes}:${time.seconds}`;
        }),
      );
  }

  get currentTime(): Time {
    const now = new Date();

    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    }
  }

  verificarAlarma(): void {
    if (this.alarmaEstablecida) {
      if (
        this.alarmaEstablecida.hours === this.currentTime.hours
        && this.alarmaEstablecida.minutes === this.currentTime.minutes
        && this.alarmaEstablecida.seconds === this.currentTime.seconds
      ) {
        alert(`ALARMA!! ${this.currentTime.hours}:${this.currentTime.minutes}`)
      }
    }
  }

  establecerAlarma(alarma: Omit<Time, 'seconds'>) {
    this.alarmaEstablecida = { ...alarma, seconds: 0 };
  }
}
