import { computed, Injectable, signal } from '@angular/core';
import { People } from '../models/people.interface';
import { initialPeopleId } from '../constants/constants';

@Injectable({ providedIn: 'root' })
export class PeopleDataService {
  private readonly people = signal<{ [id: number]: People }>({});
  private readonly selectedPeopleId = signal<number>(initialPeopleId);

  private selectedPeople = computed<People | undefined>(() => {
    return this.people()[this.selectedPeopleId()];
  });

  getPeople() {
    return this.people.asReadonly();
  }

  getSelectedPeople() {
    return this.selectedPeople;
  }

  isPeopleAlreadyFetched(id: number) {
    return !!this.people()[id];
  }

  setSelectedPeopleId(id: number) {
    this.selectedPeopleId.set(id);
  }

  addPeople(id: number, people: People) {
    return this.people.update((previousPeople) => {
      return { ...previousPeople, [id]: people };
    });
  }
}
