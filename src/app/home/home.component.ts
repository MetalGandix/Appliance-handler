import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../_services/authentication.service";
import {ApplianceService} from "../_services/appliance.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() code: EventEmitter<any> = new EventEmitter();

  constructor(private route: ActivatedRoute, public authService: AuthenticationService, public applianceService: ApplianceService) { }

  ngOnInit() {

  }

}
