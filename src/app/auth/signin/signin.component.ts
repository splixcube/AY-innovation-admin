import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(data:NgForm){
    console.log(data.value)
    this.auth.signIn(data.value.email,data.value.password)
    data.resetForm();
  }

}
