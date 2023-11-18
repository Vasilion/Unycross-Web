import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RacerProfile } from '../interfaces/rider';

@Injectable({
  providedIn: 'root'
})
export class RiderService {
  localProfile:RacerProfile;

  constructor(private http:HttpClient) 
  {

  }

  public updateLocalProfile(racerProfile:RacerProfile){
    this.localProfile = racerProfile;
  }

  public getLocalProfile(){
    return this.localProfile
  }

  // returns a list of racers
  public getRacerList(racerName:string): Observable<any>{
    let url = 'https://racehero.io/api/v1/public/sanctioning_organizations/ama/search/racers?query=' + racerName
    return this.http.get(url)
  }

  // returns profile, runs(race results), and years raced
  public getRacerProfile(slug:string): Observable<any>{  
    let url = 'https://racehero.io/api/v1/public/sanctioning_organizations/ama/racers/' + slug +'/profile'
    return this.http.get(url) 
  }

  // returns all races and points for a given rider
  public getResults(slug:string): Observable<any>{  
    let url = 'https://racehero.io/api/v1/public/sanctioning_organizations/ama/racers/'+ slug + '?include=results,points&is_proam=false'
    return this.http.get(url) 
  }

  // returns results of a specifc class on a specific event/race
  public getClassDetailsByEvent(classSlug:string): Observable<any>{  
    let url = 'https://racehero.io/api/v1/public/sanctioning_organizations/ama/runs/' + classSlug 
    return this.http.get(url) 
  }
}