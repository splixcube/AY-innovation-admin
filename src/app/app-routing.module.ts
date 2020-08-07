import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path:'',component:AdminComponent,children:[
    {path:'',component:DashboardComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
