import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { HeaderComponent } from './share/header/header.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { GalleryComponent } from './Admin/gallery/gallery.component';
import { BannerComponent } from './Admin/banner/banner.component';
import { ProductsComponent } from './Admin/products/products.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    AdminComponent,
    GalleryComponent,
    BannerComponent,
    ProductsComponent,
    AuthComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule, // required animations module
    NgxUiLoaderModule,
    ToastrModule.forRoot(), // ToastrModule added
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
