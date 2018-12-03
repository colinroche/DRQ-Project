import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router/src/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes, Router } from '@angular/router';
import {PostService} from '../services/post.service';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  post : any = [];
  myTitle : String; 
  myContent : String;
  myBackground : String;
  myPersonality : String;
  constructor(private router:Router, private route: ActivatedRoute, private service:PostService) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.service.getPost(this.route.snapshot.params['id']).subscribe(data =>
    {
      this.post = data;
      console.log(this.post);
      this.myTitle = this.post.title;
      console.log("message" +this.myTitle);

    });
  }
  onEditPost(form: NgForm) {
    this.service.updatePost(this.post._id, form.value.title, form.value.content, form.value.background, form.value.personality).subscribe(() =>
    {
      this.router.navigate(['/details']);
    });
  }

}
