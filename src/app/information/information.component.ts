import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  information = []
  constructor(private _infoService: InfoService) { }

  ngOnInit() {
    this._infoService.getInformation()
      .subscribe(
        res => this.information = res,
        err => console.log(err)
      )
  }

}
