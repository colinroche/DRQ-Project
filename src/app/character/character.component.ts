import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  character = []
  constructor(private _infoService: InfoService,
              private _router: Router) { }

  ngOnInit() {
    this._infoService.getCharacter()
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
  }

}
