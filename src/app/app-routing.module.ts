import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeModule } from './home/home.module';
import { ClientViewComponent } from './home/client-view/client-view.component';
import { ClientRegisterComponent } from './home/client-register/client-register.component';
import { ClientListComponent } from './home/client-list/client-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'persons',
    pathMatch: 'full'
  },
  {
    path: 'persons',
    children: [
      {
        path: '',
        component: ClientListComponent
      },
      {
        path: 'register',
        children: [
          {
            path: '',
            component: ClientRegisterComponent
          },
          {
            path: ':id',
            component: ClientRegisterComponent
          }
        ]
      },
      {
        path: ':id',
        component: ClientViewComponent,
        pathMatch: 'full'
      }
    ]
  },
  { 
    path: '**', 
    redirectTo: 'persons' 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
