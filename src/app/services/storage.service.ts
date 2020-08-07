import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage:AngularFireStorage) { }

  upload(path:string,file){
    return this.storage.upload(path,file).then(res=>{
     return this.getUrl(path).then(res=>{
       return res
     })
    })
  }

  async changeFile(path,file){
    await this.storage.ref(path).delete()
    return this.storage.upload(path,file)
  }

  getUrl(path:string){
    return new Promise(resolve=>{
      this.storage.ref(path).getDownloadURL()
       .subscribe(
          (data:any) => {
              resolve(data);
       })
    })
  }
  
  deleteImage(path){
    return new Promise(resolve=>{
      this.storage.ref(path).delete()
       .subscribe(
          (data:any) => {
              resolve(data);
       })
    })
  }
}
