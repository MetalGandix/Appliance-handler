import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApplianceService} from "../../_services/appliance.service";
import {Program} from "../../_models/program";
import {CurrentProgram} from "../../_models/current-program";
import {SpecificProgram} from "../../_models/specific-program";
import {ToastrService} from "ngx-toastr";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-appliance-detail',
  templateUrl: './appliance-detail.component.html',
  styleUrls: ['./appliance-detail.component.css']
})
export class ApplianceDetailComponent implements OnInit {

  // @ts-ignore
  haId: any;
  // @ts-ignore
  programs: Program[];
  // @ts-ignore
  currentProgram: CurrentProgram;
  // @ts-ignore
  currentAvailableProgram: SpecificProgram;
  // @ts-ignore
  current: boolean;
  programControl = new FormControl('', Validators.required);


  constructor(private route: ActivatedRoute, private applianceService: ApplianceService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getCurrentProgram();

    this.applianceService.getAllPrograms(this.haId).subscribe(programs => {
      console.log("tutti i programmi", programs);
      this.programs = JSON.parse(JSON.stringify(programs)).data.programs;
    })
  }

  getCurrentProgram() {
    this.haId = this.route.snapshot.paramMap.get('haId');
    this.applianceService.getCurrentProgram(this.haId).subscribe(curr => {
      this.current = true;
      this.currentProgram = JSON.parse(JSON.stringify(curr)).data;
      this.applianceService.getSpecificAvailableProgram(this.haId, this.currentProgram.key).subscribe(currAv => {
        this.currentAvailableProgram = JSON.parse(JSON.stringify(currAv)).data;
      })
    }, error => {
      this.current = false;
    })
  }

  isCurrentProgram(): boolean {
    return this.current;
  }

  stopCurrentProgram() {
    this.applianceService.stopCurrentProgram(this.haId).subscribe(res => {
      console.log(res);
    })
    this.current = false;
    this.toastr.success("Programma stoppato con successo");
  }

}
