import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { noop, tap } from 'rxjs';
import { PeopleDataService } from './people-data.service';
import { People } from '../models/people.interface';

@Injectable({ providedIn: 'root' })
export class PeopleApiService {
  private readonly http = inject(HttpClient);
  private readonly peopleDataService = inject(PeopleDataService);

  fetchPeopleById(id: number) {
    const isPeopleAlreadyFetched =
      this.peopleDataService.isPeopleAlreadyFetched(id);

    if (isPeopleAlreadyFetched) return;
    this.http
      .get<People>(`https://swapi.dev/api/people/${id}`)
      .pipe(
        tap((people) => {
          this.peopleDataService.addPeople(id, people);
        })
      )
      .subscribe(noop);
  }
}
