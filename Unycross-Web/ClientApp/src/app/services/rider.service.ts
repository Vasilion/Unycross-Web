import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RacerProfile } from '../interfaces/rider';

@Injectable({
  providedIn: 'root',
})
export class RiderService {
  localProfile: RacerProfile;

  constructor(private http: HttpClient) {}

  public updateLocalProfile(racerProfile: RacerProfile) {
    this.localProfile = racerProfile;
  }

  public getLocalProfile() {
    return this.localProfile;
  }

  // returns a list of racers
  public getRacerList(racerName: string): Observable<any> {
    let url =
      'https://racehero.io/api/v1/public/sanctioning_organizations/ama/search/racers?query=' +
      racerName;
    return this.http.get(url);
  }

  // returns profile, runs(race results), and years raced
  public getRacerProfile(slug: string): Observable<any> {
    let url =
      'https://racehero.io/api/v1/public/sanctioning_organizations/ama/racers/' +
      slug +
      '/profile';
    return this.http.get(url);
  }

  // returns all races and points for a given rider
  public getResults(slug: string): Observable<any> {
    let url =
      'https://racehero.io/api/v1/public/sanctioning_organizations/ama/racers/' +
      slug +
      '?include=results,points&is_proam=false';
    return this.http.get(url);
  }

  public getTracks(): Observable<any> {
    let url = 'https://localhost:7224/api/Tracks';
    return this.http.get(url);
  }

  // returns results of a specifc class on a specific event/race
  public getClassDetailsByEvent(classSlug: string): Observable<any> {
    let url =
      'https://racehero.io/api/v1/public/sanctioning_organizations/ama/runs/' +
      classSlug;
    return this.http.get(url);
  }

  public getTrackWeather(lat: number, long: number): Observable<any> {
    let headers = new HttpHeaders({
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      'x-rapidapi-key': '2c9192e3d8msh3cfc5bd08410a94p148ae2jsnf05187d2a9b0',
    });
    return this.http.get<any>(
      'https://weatherapi-com.p.rapidapi.com/current.json?q=' +
        lat +
        ',' +
        long,
      {
        headers: headers,
      }
    );
  }
}
