import { Component, OnInit } from '@angular/core';
import {ApplianceService} from "../../_services/appliance.service";
import {Appliance} from "../../_models/appliance";
import {FormControl} from "@angular/forms";
import {AuthenticationService} from "../../_services/authentication.service";

@Component({
  selector: 'app-appliances-list',
  templateUrl: './appliances-list.component.html',
  styleUrls: ['./appliances-list.component.css']
})
export class AppliancesListComponent implements OnInit {

  // @ts-ignore
  appliances: Appliance[];
  data: any;
  toggle = new FormControl('', []);

  constructor(public appliancesService: ApplianceService, public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.toggle.valueChanges.subscribe(value => {
      console.log("value", value);
    });
    this.appliancesService.applianceList().subscribe(appliances => {
      console.log(appliances);
      this.appliances = JSON.parse(JSON.stringify(appliances)).data.homeappliances;
      if (this.appliances[0].connected)
        this.toggle.setValue(true);
      console.log(this.appliances);
      console.log(this.appliances[0].name);
    })
  }

}
