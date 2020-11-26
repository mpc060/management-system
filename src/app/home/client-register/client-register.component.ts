import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/shared/models/alert';
import { AlertComponent } from './../../shared/components/alert/alert.component';
import { Person } from './../../shared/models/person';
import { PersonsService } from './../../core/person.service';
import { ValidFieldService } from './../../shared/components/form-fields/service/valid-field.service';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss']
})
export class ClientRegisterComponent implements OnInit {

  id: number;

  register: FormGroup;

  skills: Array<string>;

  constructor(public validation: ValidFieldService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private location: Location,
              private personService: PersonsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.register.controls;
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.personService.view(this.id)
        .subscribe((person: Person) => this.createForm(person));
    } else {
      this.createForm(this.initializeForm());
    }

    this.skills = [
      "JavaScript", 
      'Angular',
      'Vue',
      'React',
      "PHP",
      "Flutter"
    ];
  }

  submit(): void {
    this.register.markAllAsTouched();
    if (this.register.invalid) {
      return;
    }

    const person = this.register.getRawValue() as Person;
    if (this.id) {
      person.id = this.id;
      this.edit(person);
    } else {
      this.save(person);
    }
  }

  restartForm(): void {
    this.register.reset();
  }

  private createForm(person: Person): void {
    this.register = this.fb.group({
      name: [person.name, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      age: [person.age, [Validators.required, Validators.minLength(10)]],
      address: [person.address, [Validators.required]],
      city: [person.city, [Validators.required]],
      country: [person.country, [Validators.required, Validators.min(0), Validators.max(64)]],
      skill: [person.skill],
      dateOfBirth: [person.dateOfBirth, [Validators.required]],
      description: [person.description],
    });
  }

  private initializeForm(): Person {
    return {
      id: null,
      name: null,
      age: null,
      address: null,
      city: null,
      country: null,
      skill: null,
      dateOfBirth: null,
      description: null
    } as Person;
  }

  private save(person: Person): void {
    console.log(person);
    this.personService.save(person).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar uma nova pessoa',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alert
      };
      const dialogRef = this.dialog.open(AlertComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('persons');
        } else {
          this.restartForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alert
      };
      this.dialog.open(AlertComponent, config);
    });
  }

  private edit(person: Person): void {
    this.personService.edit(person).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alert
      };
      const dialogRef = this.dialog.open(AlertComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('persons'));
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alert
      };
      this.dialog.open(AlertComponent, config);
    });
  }

  return(){
    this.location.back();
  }
}
