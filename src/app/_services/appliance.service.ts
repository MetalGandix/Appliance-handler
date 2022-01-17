import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Appliance} from "../_models/appliance";
import {Program} from "../_models/program";
import {SpecificProgram} from "../_models/specific-program";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {

  private base_url = 'https://api.home-connect.com/api/homeappliances';

  constructor(private http: HttpClient) { }

  applianceList() {
    console.log("lista elettrodomestici")
    // @ts-ignore
    return this.http.get<Appliance[]>(this.base_url);
  }

  applianceInfo(haId: string) {
    return this.http.get(this.base_url + "/" + haId);
  }

  getAllPrograms(haId: string) {
    return this.http.get<Program[]>(this.base_url + "/" + haId + "/programs/available");
  }

  getCurrentProgram(haId: string) {
    return this.http.get<Program>(this.base_url + "/" + haId + "/programs/active");
  }

  getSpecificAvailableProgram(haId: string, programKey: string) {
    return this.http.get<SpecificProgram>(this.base_url + "/" + haId + "/programs/available/" + programKey);
  }

  stopCurrentProgram(haId: string) {
    return this.http.delete(this.base_url + "/" + haId + "/programs/active");
  }

  startProgram(haId: string, program: any) {
    let body = JSON.stringify(program);
    return this.http.put(this.base_url + "/" + haId + "/programs/active", program);
  }
}
