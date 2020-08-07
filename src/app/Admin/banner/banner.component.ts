import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  imgSrc = "assets/images/click-image.jpg"
  recieveBanner = []
  selectedImage
  imagePath
  imageEvent
  constructor(public banner:BannerService) { }
  ngOnInit(): void {
    this.banner.getBanner().subscribe(res=>{
      console.log(res)
      this.recieveBanner = res
    })
  }

  bannerImg(event){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = "assets/images/click-image.jpg";
      this.selectedImage = null;
    }
    // console.log(event.target.files[0])
    let now = new Date()
    let rand = now.toString()
    let path="Banner/1"+rand
    this.imagePath = path
    this.imageEvent = event.target.files[0]
  }


  OnUpload(data:NgForm){
    console.log(this.imageEvent,this.imagePath)
    this.banner.addBanner(this.imageEvent,this.imagePath)
    data.resetForm()
    this.imgSrc = "assets/images/click-image.jpg";
  }

  onDelete(id,path){
    console.log(id,path)
    this.banner.onDeleteBanner(id,path)
  }

}
