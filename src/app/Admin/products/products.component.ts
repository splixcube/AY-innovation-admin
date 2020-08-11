import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  imgSrc = 'assets/images/click-image.jpg'
  selectedImage
  CoverPath
  CoverEvent
  images = []
  myForm
  GalleryImg
  specificationArray = []
  dataSheetFilePath
  dataSheetFileUrl
  allProductsArray = []
  constructor(public product:ProductsService) { }

  ngOnInit(): void {
    this.product.getAllProducts().subscribe(res=>{
      this.allProductsArray = res
      console.log(this.allProductsArray)
    })
  }

  CoverImg(event){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = 'assets/images/click-image.jpg';
      this.selectedImage = null;
    }
    let now = new Date()
    let rand = now.toString()
    let path="CoverImage/1"+rand
    this.CoverPath = path
    this.CoverEvent = event.target.files[0]
  }

  datasheetFile(event){
    let now = new Date()
    let rand = now.toString()
    let path="datasheet/1"+rand
    this.dataSheetFilePath = path
    this.dataSheetFileUrl = event.target.files[0]
    console.log("dataSheetFilePath",this.dataSheetFilePath)
    console.log("dataSheetFileEvent",this.dataSheetFileUrl)
  }

  galleryImageProcessing(event){
    console.log(event)
    this.GalleryImg = event
      if (event.target.files && event.target.files[0]) {
          var filesAmount = event.target.files.length;
          for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();
              reader.onload = (event:any) => {
                console.log(event.target.result);
                  this.images.push(event.target.result); 
                console.log(this.images)
                  this.myForm.patchValue({
                    fileSource: this.images
                  });
              }
              reader.readAsDataURL(event.target.files[i]);
          }
      }
    
  }

  onSpecificationDelete(i){
    console.log(i)
    this.specificationArray.splice(i,1)
  }

  async onAddSpecification(key,value){
    console.log(key.value,value.value)
    let data = {
      key:key.value,
      value:value.value
    }
    await this.specificationArray.push(data)
    console.log(this.specificationArray)
  }

  PreviewDelete(index){
    console.log(index)
    this.images.splice(index,1)
  }

  OnSubmit(data:NgForm){
    console.log(data.value)
    this.product.addProduct(data.value,this.CoverPath,this.CoverEvent,this.specificationArray,this.dataSheetFilePath,this.dataSheetFileUrl,this.GalleryImg)
    // data.resetForm()
    // this.images = []
    // this.imgSrc = 'assets/images/click-image.jpg'
  }

  onDeleteProduct(id){
    console.log(id)
    this.product.getSingleProduct(id).subscribe(productDetail=>{
      this.product.onProductDelete(id,productDetail)
    })
  }


}
