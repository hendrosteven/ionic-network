import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { PostService } from '../../services/post-service';
import { PhotoService } from '../../services/photo-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  photos: any[] = [];
  photosOrigin: any[] = [];
  page: number = 0;

  constructor(public navCtrl: NavController, 
      private postService: PostService, 
      private photoService: PhotoService,
      private loadingCtrl: LoadingController) {
  }

  ionViewWillEnter(){
    let loading = this.loadingCtrl.create({content: "Please wait.."});
    loading.present();
    this.photoService.findAllPhoto().subscribe(data =>{
      this.photosOrigin = data;
      this.photos = this.photosOrigin.slice(this.page, this.page+15);
      loading.dismiss();
    },error=>{
      loading.dismiss();
      console.log(error);
    });
  }  

  doInfinite(infiniteScroll) {    
    setTimeout(() => {  
      let loading = this.loadingCtrl.create({content: "Load more.."});
      loading.present();    
      this.page += 15;      
      let morePhotos = this.photosOrigin.slice(this.page,this.page+15);      
      this.photos = this.photos.concat(morePhotos);
      infiniteScroll.complete();
      loading.dismiss();
    }, 500);
  }
}
