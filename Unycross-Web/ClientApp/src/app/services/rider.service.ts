import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RacerProfile, RacerProfileRaceResult } from '../interfaces/rider';

@Injectable({
  providedIn: 'root',
})
export class RiderService {
  localProfile: RacerProfile;
  isUserProfile: boolean;

  constructor(private http: HttpClient, private router: Router) {}

  public updateLocalProfile(racerProfile: RacerProfile) {
    this.localProfile = racerProfile;
  }

  public getLocalProfile() {
    return this.localProfile;
  }

  public checkUserProfile() {
    return this.isUserProfile;
  }

  public buildUserProfile(racerSlug: string) {
    this.getRacerProfile(racerSlug).subscribe((res) => {
      let allRaces: RacerProfileRaceResult[] = [];
      res.runs.forEach((race) => {
        let result: RacerProfileRaceResult = {
          class: race.name,
          position: race.results[0].position_in_class,
          dateString: race.started_at,
        };
        allRaces.push(result);
      });
      let racerProfileResponse: RacerProfile = {
        firstName: res.profile.first_name,
        lastName: res.profile.last_name,
        birthdate: res.profile.birthdate,
        city: res.profile.city,
        homeTown: res.profile.homeTown,
        amaNumber: res.profile.meta.ama_num,
        class: res.profile.meta.levels.MX,
        slug: res.profile.slug,
        state: res.profile.state,
        raceResults: allRaces,
      };
      this.localProfile = racerProfileResponse;
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/rider-profile']));
    });
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
    let url = environment.UnyApiBaseUrl + '/api/Tracks';
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
