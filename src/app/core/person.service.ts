import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigParams } from '../shared/models/config-params';
import { Person } from '../shared/models/person';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/Persons/';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  constructor(private http: HttpClient,
              private configService: ConfigParamsService) { }

  save(person: Person): Observable<Person> {
    return this.http.post<Person>(url, person);
  }

  edit(person: Person): Observable<Person> {
    return this.http.put<Person>(url + person.id, person);
  }

  list(config: ConfigParams): Observable<Person[]> {
    const configPrams = this.configService.configureParameters(config);
    return this.http.get<Person[]>(url, {params: configPrams});
  }

  view(id: number): Observable<Person> {
    return this.http.get<Person>(url + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
