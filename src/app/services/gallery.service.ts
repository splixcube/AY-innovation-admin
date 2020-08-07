import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { CommonService } from './common.service';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(public db:AngularFirestore,public storage:AngularFireStorage,public common:CommonService) { }

  uploadGalleryImg(event) {
    this.common.showLoader()
    for (var i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i]
        // this.SingleFile = file
        let date = new Date()
        let path = "/gallery/" + file.name + date
        console.log(path, file)
        this.storage.upload(path, file).then(res=>{
          console.log("Upload work",res)
          res.ref.getDownloadURL().then(res=>{
            console.log("Url",res)
            console.log("path",path)
            let galleryUrl = res
            let galleryPath = path
            let timeStamp = firebase.firestore.Timestamp.now()
            let allData = {galleryPath,galleryUrl,timeStamp} 
            this.db.collection("gallery").add(allData).then(res=>{
              console.log("image saved in database")
              console.log(res)
              this.common.showToast("success","Gallery Image Uploaded Successful!","Successful!")
            })
          })
        }).catch(err=>{
          this.common.showToast("error","Error",err)
        }).finally(()=>{
          this.common.stopLoader()
        })
      };
  }

  getGallery() {
    return this.db.collection("gallery",ref=>ref.orderBy("timeStamp","desc")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  deleteGalleryImage(id,path){
    this.common.showLoader()
    this.db.collection("gallery").doc(id).delete().then(res=>{
      this.storage.ref(path).delete()
      this.common.showToast("success","Gallery Image Deleted Successful!","Successful!")
      this.common.stopLoader()
    })
  }
}
