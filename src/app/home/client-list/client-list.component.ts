
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { PersonsService } from './../../core/person.service';
import { Person } from './../../shared/models/person';
import { ConfigParams } from 'src/app/shared/models/config-params';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})

export class ClientListComponent implements OnInit {

  readonly noPhoto = 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Person_icon_BLACK-01.svg';

  config: ConfigParams = {
    page: 0,
    limit: 8
  };

  persons: Person[] = [];

  filterList: FormGroup;

  skills: Array<string>;

  constructor(private personService: PersonsService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.filterList = this.fb.group({
      text: [''],
      skill: ['']
    });

    this.filterList.get('text').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.config.search = val;
      this.resetSearch();
    });

    this.filterList.get('skill').valueChanges.subscribe((val: string) => {
      this.config.field = {type: 'skill', value: val};
      this.resetSearch();
    });

    this.listPersons();

    this.skills = [
      "JavaScript", 
      'Angular',
      'Vue',
      'React',
      "PHP",
      "Flutter"
    ];
  }

  onScroll(): void {
    this.listPersons();
  }

  open(id: number): void {
    this.router.navigateByUrl('/persons/' + id);
  }

  private listPersons(): void {
    this.config.page++;
    this.personService.list(this.config)
      .subscribe((person: Person[]) => this.persons.push(...person));
  }

  private resetSearch(): void {
    this.config.page = 0;
    this.persons = [];
    this.listPersons();
  }

  register(): void {
    this.router.navigateByUrl('/persons/register');
  }

}
