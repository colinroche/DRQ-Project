import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  constructor(private service:PostService) { }

  onAddPost(form: NgForm) {

    this.service.addPost(form.value.title, form.value.content, form.value.background, form.value.personality).subscribe();
    
    console.log(form.value);
    form.resetForm();
  }


  ngOnInit() {



  }

  /*// was for auth guarded character page
 / ngOnInit() {
    this._service.getCharacter()
      .subscribe(
        res => this.character = res,
        err => {
          // if error, navigates to the login page
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }*/

}
