import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  EventId
  constructor(public db:AngularFirestore,public storage:AngularFireStorage,public common:CommonService) { }

  addProduct(data,CoverPathh,CoverEventt,galleryEvent?:any){
    this.common.showLoader()
    if(galleryEvent){
    console.log("Event with gallery")
    console.log(data)
    this.storage.upload(CoverPathh,CoverEventt).then(res=>{
      res.ref.getDownloadURL().then(res=>{
        let timeStamp = firebase.firestore.Timestamp.now()
        let CoverPath = CoverPathh
        let CoverUrl = res
        let allData = {CoverPath,CoverUrl,timeStamp,...data}
        console.log(allData)
        this.db.collection("products").add(allData).then(res=>{
          console.log(res)
          console.log(res.id)
          console.log("product data Add except gallery image")
          this.EventId = res.id
          console.log(galleryEvent)
          for (var i = 0; i < galleryEvent.target.files.length; i++){
            const file = galleryEvent.target.files[i]
              let date = new Date()
              let path = "/productGallery/" + file.name + date
              console.log(path, file)
              this.storage.upload(path, file).then(res=>{
                res.ref.getDownloadURL().then(res=>{
                  console.log("productUrl",res)
                  console.log("productPath",path)
                  let productGalleryUrl = res
                  let productGalleryPath = path
                  let allData = {productGalleryPath,productGalleryUrl} 
                  // this.EventGallery.push(allData)
                  this.db.collection("products").doc(this.EventId).collection("productGallery").add(allData).then(res=>{
                    console.log("Product Gallery Add!")
                    this.common.showToast("success","Product Added Successful!","Successful!")
                  }).catch(err=>{
                    this.common.showToast("error","Error",err)
                  }).finally(()=>{
                    this.common.stopLoader()
                  })
                })
              })
          }
        })
      })
    })
  }
  else
  {
    console.log("Event without gallery")
    this.storage.upload(CoverPathh,CoverEventt).then(res=>{
      res.ref.getDownloadURL().then(res=>{
        let timeStamp = firebase.firestore.Timestamp.now()
        let CoverPath = CoverPathh
        let CoverUrl = res
        let allData = {CoverPath,CoverUrl,timeStamp,...data}
        console.log(allData)
        this.db.collection("Events").add(allData).then(res=>{
          console.log("Event Save Without Gallery")
          this.common.showToast("success","Product Added Successful!","Successful!")
          }).catch(err=>{
            this.common.showToast("error","Error",err)
          }).finally(()=>{
            this.common.stopLoader()
          })
      })
    })
  }
}

}
