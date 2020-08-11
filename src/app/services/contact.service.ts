import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(public db:AngularFirestore,public common:CommonService) { }

  getContactFormData(){
    return this.db.collection("contact-us",ref=>ref.orderBy("timeStamp","desc")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }
}
