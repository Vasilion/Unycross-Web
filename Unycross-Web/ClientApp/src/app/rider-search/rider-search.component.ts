import { Component, OnInit } from '@angular/core';
import {
  Racer,
  RacerProfile,
  RacerProfileRaceResult,
} from '../interfaces/rider';
import { RiderService } from '../services/rider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rider-search',
  templateUrl: './rider-search.component.html',
  styleUrls: ['./rider-search.component.css'],
})
export class RiderSearchComponent implements OnInit {
  racerList: Racer[] = [];
  searchNode = document.getElementById('rider-search');
  racerProfile: RacerProfile;
  isLoading: boolean = false;
  constructor(private riderService: RiderService, private router: Router) {}

  ngOnInit(): void {}

  public riderLookup(rider: string): any {
    this.racerList = [];
    this.isLoading = true;
    this.riderService.getRacerList(rider).subscribe((res) => {
      res.data.forEach((element) => {
        let racer: Racer = {
          name: element.name,
          slug: element.slug,
          state: element.state,
          city: element.city,
        };
        this.racerList.push(racer);
      });
      this.isLoading = false;
    });
  }

  // public listenToSearch(rider: string): void {
  //   this.searchNode?.addEventListener('keyup', (event: KeyboardEvent) => {
  //     if (event.key === 'Enter') {
  //       this.riderLookup(rider);
  //     }
  //   });
  // }

  buildRacerProfile(racerSlug: string) {
    this.riderService.getRacerProfile(racerSlug).subscribe((res) => {
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
      this.racerProfile = racerProfileResponse;
      this.riderService.localProfile = this.racerProfile;
      this.router.navigateByUrl('/riderProfile');
    });
  }
}
