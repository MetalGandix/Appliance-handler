import {Component, Input, OnInit} from '@angular/core';
import {ApplianceService} from "../../_services/appliance.service";
import {SpecificProgram} from "../../_models/specific-program";
import {Program} from "../../_models/program";
import {OptionsViewModel} from "../../_models/options-view-model";
import {ProgramToExecute} from "../../_models/program-to-execute";
import {Options} from "../../_models/options";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-appliance-option',
  templateUrl: './appliance-option.component.html',
  styleUrls: ['./appliance-option.component.css']
})
export class ApplianceOptionComponent implements OnInit {

  // @ts-ignore
  private _program_key: string;
  // @ts-ignore
  @Input() set programKey(value: string) {
    this._program_key = value;
    this.getProgramOptions(this._program_key);
  }
  // @ts-ignore
  @Input() haId: any;
  // @ts-ignore
  specificProgram: SpecificProgram;
  // @ts-ignore
  viewModel: OptionsViewModel;
  // @ts-ignore
  programToExecute: ProgramToExecute;
  // @ts-ignore
  running: boolean = false;
  // @ts-ignore
  start = '6:00';
  toggle = new FormControl('', []);
  // @ts-ignore
  minutesOptions: Array<any> = [];
  minutesInSeconds: any;
  // @ts-ignore
  minutes: any;

  constructor(private applianceService: ApplianceService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.programToExecute = {data: {key: "", options: []}};
  }

  get programKey(): string {
    return this._program_key;
  }

  getProgramOptions(program_key: string) {
    if (program_key != null) {
      this.applianceService.getSpecificAvailableProgram(this.haId, program_key).subscribe(res => {
        console.log("Response ", res);
        this.specificProgram = JSON.parse(JSON.stringify(res)).data;
        this.viewModel = this.specificProgram;
        console.log(this.viewModel);
        console.log(this.specificProgram);
        for (var i = 0; i < this.viewModel.options.length; i++) {
          if (this.viewModel.options[i].key == 'BSH.Common.Option.Duration') {
            for (var j = 1; j < (this.viewModel.options[i].constraints.max)/60; j++) {
              this.minutesOptions.push(j);
            }
          }
        }
      })
    }
  }

  updateSetting(event: any, key: string) {
    for (var i = 0; i < this.viewModel.options.length; i++) {
      if (this.viewModel.options[i].key == key) {
        this.viewModel.options[i].constraints.value = event.value;
      }
    }
    console.log(this.viewModel)
  }

  updateMaxMinutes(event: any) {
    if (event.isUserInput == true) {
      this.minutes = event.source.value;
      console.log(this.minutes)
    }

    for (var i = 0; i < this.viewModel.options.length; i++) {
      if (this.viewModel.options[i].key == 'BSH.Common.Option.Duration') {
        this.viewModel.options[i].constraints.value = this.minutes*60;
      }
    }
  }

  startProgram() {
    console.log(this.minutes)
    this.updateStart();
    this.programToExecute.data.key = this.viewModel.key;
    console.log(this.viewModel)

    for (const option of this.viewModel.options) {
      const x = {
        key: option.key,
        value: option.constraints.value,
        unit: option.unit
      } as Options;
      this.programToExecute.data.options.push(x);
    }

    console.log(this.programToExecute);
    this.applianceService.startProgram(this.haId, this.programToExecute).subscribe(res => {
      console.log(res);
      this.running = true;
    })
  }

  stopCurrentProgram() {
    this.applianceService.stopCurrentProgram(this.haId).subscribe(res => {
      console.log(res);
      this.toastr.success("Programma stoppato con successo");
      this.running = false;
    })
  }

  onSwitchChange(event: any, key: any) {
    for (var i = 0; i < this.viewModel.options.length; i++) {
      if (this.viewModel.options[i].key == key) {
        this.viewModel.options[i].constraints.value = event.checked;
      }
    }
    console.log(event.checked);
    console.log(this.viewModel);
  }

  updateStart() {
    var date = new Date();
    var totalSeconds = 0;
    var startProgram = this.start.split(":", 2);
    console.log(startProgram);
    var hour = Number(startProgram[0]);
    var minute = Number(startProgram[1]);
    var currentHour = date.getHours();
    var currentMinute = date.getMinutes();
    if ((hour - currentHour) >= 0) {
      if (hour == currentHour && minute == currentMinute) {
        totalSeconds = 0;
      }else {
      totalSeconds = totalSeconds + (((hour - currentHour)*60)*60);
      totalSeconds = totalSeconds + ((minute - currentMinute)*60);
      }
    }
    console.log(totalSeconds);

    for (var i = 0; i < this.viewModel.options.length; i++) {
      if (this.viewModel.options[i].key == 'BSH.Common.Option.StartInRelative') {
        this.viewModel.options[i].constraints.value = totalSeconds;
      }

      console.log(this.viewModel)
    }
  }
}



