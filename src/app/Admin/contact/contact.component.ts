import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
contactDetails = []
  constructor(public contact:ContactService) { }

  ngOnInit(): void {
    this.contact.getContactFormData().subscribe(res=>{
      this.contactDetails = res
      console.log(this.contactDetails)
    })
  }

}
