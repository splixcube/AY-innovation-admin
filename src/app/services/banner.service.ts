import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommonService } from './common.service';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators'
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(public db:AngularFirestore,public common:CommonService,public storage:StorageService) { }

  addBanner(file,path:string){
    console.log(file,path)
    this.common.showLoader()
    this.storage.upload(path,file).then(res=>{
      console.log(res)
      let imgUrl = res
      let imgPath = path
      let timeStamp = firebase.firestore.Timestamp.now()
      let allData = {imgUrl,imgPath,timeStamp}
      console.log(allData)
      this.db.collection("banner").add(allData).then(res=>{
        this.common.showToast("success","Successfull!","Successfull Banner")
      }).catch(err=>{
        this.common.showToast("error","Error",err)
      }).finally(()=>{
        this.common.stopLoader()
      })
    })
  }

  getBanner(){
    return this.db.collection("banner",ref=>ref.orderBy("timeStamp","desc")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  onDeleteBanner(id,path){
    console.log(id,path)
    this.common.showLoader()
    this.storage.deleteImage(path).then(res=>{
      this.db.collection("banner").doc(id).delete().then(res=>{
        this.common.showToast("success","Deleted!","Image Deleted Successfull!")
      }).catch(err=>{
        this.common.showToast("error","Error",err)
      }).finally(()=>{
        this.common.stopLoader()
      })
    })
  }
}
