import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '../shared/material/material.module';
import { formFieldModule } from './../shared/components/form-fields/form-fields.module';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientViewComponent } from './client-view/client-view.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    formFieldModule,
    InfiniteScrollModule
  ],
  declarations: [ ClientRegisterComponent, ClientListComponent, ClientViewComponent ]
})
export class HomeModule { } 