import { Component, DestroyRef, inject } from '@angular/core';
import { PeopleApiService } from './services/people-api.service';
import { PeopleDataService } from './services/people-data.service';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { noop, startWith, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { initialPeopleId } from './constants/constants';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly peopleApiService = inject(PeopleApiService);
  private readonly peopleDataService = inject(PeopleDataService);

  readonly peopleIdControl = new FormControl<number>(initialPeopleId);
  readonly selectedPeople = this.peopleDataService.getSelectedPeople();

  constructor() {
    this.listenToPeopleIdControlChanges();
  }

  private listenToPeopleIdControlChanges() {
    this.peopleIdControl.valueChanges
      .pipe(
        startWith(this.peopleIdControl.value),
        tap((peopleId) => {
          this.peopleDataService.setSelectedPeopleId(peopleId!);
          this.peopleApiService.fetchPeopleById(peopleId!);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(noop);
  }
}
