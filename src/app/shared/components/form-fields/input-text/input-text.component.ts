import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidFieldService } from './../service/valid-field.service';


@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {

  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  constructor(public validation: ValidFieldService) { }

  ngOnInit() {
  }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
