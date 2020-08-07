import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  File1
  getImages = []
  previewImgArray = []
  constructor(public gallery:GalleryService) { }

  ngOnInit(): void {
    this.gallery.getGallery().subscribe(res=>{
      this.getImages = res
      console.log(this.getImages)
    })
  }

  imageProcessing(event) {
    // let path = userid/gallery/docid
    console.log(event)
    this.File1 = event
    console.log(this.File1)
    // for (var i = 0; i < event.target.files.length; i++) {
    //   const file = event.target.files[i]
    //   // console.log(file)
    //   // this.digitalService.uploadGalleryImg(file)
    //   // this.storage.uploadGalleryImg(file)
    //   };
  }

  OnUpload(data: NgForm) {
    console.log(this.File1)
    this.gallery.uploadGalleryImg(this.File1)
    data.resetForm()
  }

  removeImage(id,path){
    console.log(id,path)
    this.gallery.deleteGalleryImage(id,path)
  }

}
