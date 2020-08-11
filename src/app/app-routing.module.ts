import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BannerComponent } from './Admin/banner/banner.component';
import { ProductsComponent } from './Admin/products/products.component';
import { GalleryComponent } from './Admin/gallery/gallery.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ContactComponent } from './Admin/contact/contact.component';


const routes: Routes = [
  {path:'',redirectTo:'/admin',pathMatch:'full'},
  {path:'auth',component:AuthComponent,children:[
    {path:'',component:SigninComponent}
  ]},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuardService],children:[
    {path:'',component:DashboardComponent},
    {path:'banner',component:BannerComponent},
    {path:'products',component:ProductsComponent},
    {path:'gallery',component:GalleryComponent},
    {path:'contact',component:ContactComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
