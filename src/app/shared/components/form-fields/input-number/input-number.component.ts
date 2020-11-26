import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { ValidFieldService } from './../service/valid-field.service';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent implements OnInit {
  
  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() minimo = 0;
  @Input() maximo = 10;
  @Input() step = 1;
  
  constructor(public validation: ValidFieldService) { }

  ngOnInit() {
  }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
