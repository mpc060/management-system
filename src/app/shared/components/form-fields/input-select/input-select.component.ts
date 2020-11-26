import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidFieldService } from './../service/valid-field.service';


@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit {

  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() opcoes: Array<string>;

  constructor(public validation: ValidFieldService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

  ngOnInit() {
  }

}
