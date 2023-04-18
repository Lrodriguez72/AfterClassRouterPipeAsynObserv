import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Time, TimeService } from 'src/app/core/services/time.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  hoursControl = new FormControl();
  minutesControl = new FormControl();

  alarmForm = new FormGroup({
    hours: this.hoursControl,
    minutes: this.minutesControl,
  });

  horaActualNoAsync: string | null = null;

  horaActual$: Observable<string>;

  suscriptionRef: Subscription | null;

  constructor(private timeService: TimeService) {

    this.horaActual$ = this.timeService.reloj;

    this.suscriptionRef = this.timeService.reloj.subscribe((valor) => {
      this.horaActualNoAsync = valor
    });
  }

  ngOnDestroy(): void {
    this.suscriptionRef?.unsubscribe();
  }

  onSubmit() {
    this.timeService.establecerAlarma(this.alarmForm.value as Time);
  }
}
