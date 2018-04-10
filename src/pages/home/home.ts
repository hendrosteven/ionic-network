import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostService } from '../../services/post-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private postService: PostService) {

  }

  ionViewWillEnter(){
    this.postService.findAllPost().subscribe(posts => {
      console.log(posts);
    },error=>{
      console.log(error);
    });
  }

}
