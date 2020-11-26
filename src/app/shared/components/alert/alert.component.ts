import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Alert } from '../../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alert = {
    titulo: 'Atenção!',
    descricao: 'Seu registro foi cadastrado com sucesso!',
    btnSucesso: 'OK',
    btnCancelar: 'Cancelar',
    corBtnSucesso: 'accent',
    corBtnCancelar: 'warn',
    possuirBtnFechar: false
  } as Alert;

  constructor(public dialogRef: MatDialogRef<AlertComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Alert) { }

  ngOnInit() {
    if (this.data) {
      this.alert.title = this.data.title || this.alert.title;
      this.alert.descricao = this.data.descricao || this.alert.descricao;
      this.alert.btnSucesso = this.data.btnSucesso || this.alert.btnSucesso;
      this.alert.btnCancelar = this.data.btnCancelar || this.alert.btnCancelar;
      this.alert.corBtnSucesso = this.data.corBtnSucesso || this.alert.corBtnSucesso;
      this.alert.corBtnCancelar = this.data.corBtnCancelar || this.alert.corBtnCancelar;
      this.alert.possuirBtnFechar = this.data.possuirBtnFechar || this.alert.possuirBtnFechar;
    }
  }

}
