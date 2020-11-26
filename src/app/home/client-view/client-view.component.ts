import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from './../../shared/components/alert/alert.component';
import { PersonsService } from './../../core/person.service';
import { Person } from './../../shared/models/person';
import { Alert } from 'src/app/shared/models/alert';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {

  readonly noPhoto = 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Person_icon_BLACK-01.svg';

  person: Person;

  id: number;
  
  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private location: Location,
              private personsService: PersonsService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.view();
  }

  edit(): void {
    this.router.navigateByUrl('/persons/register/' + this.id);
  }

  delete(): void {
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certceza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alert
    };
    const dialogRef = this.dialog.open(AlertComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.personsService.delete(this.id)
        .subscribe(() => this.router.navigateByUrl('/persons'));
      }
    });
  }

  private view(): void {
    this.personsService.view(this.id).subscribe((person: Person) => this.person = person);
  }

  return(){
    this.location.back();
  }

}
