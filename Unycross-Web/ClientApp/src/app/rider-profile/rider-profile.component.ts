import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';
import { switchMap } from 'rxjs';
import {
  Event,
  RacerProfile,
  RacerProfileRaceResult,
} from '../interfaces/rider';
import { RiderService } from '../services/rider.service';

@Component({
  selector: 'app-rider-profile',
  templateUrl: './rider-profile.component.html',
  styleUrls: ['./rider-profile.component.css'],
})
export class RiderProfileComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  racerProfile: RacerProfile;
  racerResults: Event[];
  racerTotalRaces: number = 0;
  racerTotalPodiums: number = 0;
  panelOpenState: boolean = false;
  modalID: string;
  eventResults: any[];
  riderRank: string;
  experienceToLevelUp: string;
  isLoading: boolean = false;
  experienceProgress: number = 0;
  rankCss: string = '';

  constructor(private riderService: RiderService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.racerProfile = this.riderService.getLocalProfile();
    this.getRacerResults();
  }

  getRacerResults() {
    this.riderService.getResults(this.racerProfile.slug).subscribe((res) => {
      this.racerTotalPodiums = 0;
      let allResults: Event[] = [];
      res.results.forEach((race) => {
        let classSlugIndex = race.run.results_url.lastIndexOf('/');
        let cSlug = race.run.results_url.substring(classSlugIndex + 1);
        let result: Event = {
          dateString: race.event.started_at,
          eventName: race.event.name,
          trackName: race.event.venue.name,
          eventSlug: race.event.slug,
          id: race.event.id,
          city: race.event.meta.city,
          district: race.event.meta.district,
          year: race.event.meta.season,
          state: race.event.meta.state,
          class: race.racer_class,
          racerName: race.racer_name,
          amaNumber: race.racer_number,
          moto1Result: race.meta.moto1Finish,
          moto2Result: race.meta.moto2Finish,
          overallResult: race.position_in_class,
          eventPoints: race.meta.points,
          classSlug: cSlug,
        };
        if (
          result.overallResult == '1' ||
          result.overallResult == '2' ||
          result.overallResult == '3'
        ) {
          this.racerTotalPodiums += 1;
        }
        allResults.push(result);
      });
      this.racerResults = allResults.reverse();
      this.racerTotalRaces = allResults.length;
      this.setRiderRank(this.racerResults);
      this.isLoading = false;
    });
  }

  buildRacerProfile(racerSlug: string) {
    this.isLoading = true;
    this.riderService
      .getRacerProfile(racerSlug)
      .pipe(
        switchMap((res) => {
          const allRaces: RacerProfileRaceResult[] = [];
          res.runs.forEach((race) => {
            const result: RacerProfileRaceResult = {
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
          this.riderService.updateLocalProfile(this.racerProfile);
          return this.riderService.getResults(this.racerProfile.slug);
        })
      )
      .subscribe((res) => {
        this.racerTotalPodiums = 0;
        let allResults: Event[] = [];
        res.results.forEach((race) => {
          const classSlugIndex: number = race.run.results_url.lastIndexOf('/');
          const cSlug: string = race.run.results_url.substring(
            classSlugIndex + 1
          );
          const result: Event = {
            dateString: race.event.started_at,
            eventName: race.event.name,
            trackName: race.event.venue.name,
            eventSlug: race.event.slug,
            id: race.event.id,
            city: race.event.meta.city,
            district: race.event.meta.district,
            year: race.event.meta.season,
            state: race.event.meta.state,
            class: race.racer_class,
            racerName: race.racer_name,
            amaNumber: race.racer_number,
            moto1Result: race.meta.moto1Finish,
            moto2Result: race.meta.moto2Finish,
            overallResult: race.position_in_class,
            eventPoints: race.meta.points,
            classSlug: cSlug,
          };
          if (
            result.overallResult == '1' ||
            result.overallResult == '2' ||
            result.overallResult == '3'
          ) {
            this.racerTotalPodiums += 1;
          }
          allResults.push(result);
        });
        this.racerResults = allResults.reverse();
        this.racerTotalRaces = allResults.length;
        this.setRiderRank(this.racerResults);
        this.isLoading = false;
      });
  }

  setRiderRank(results: Event[]) {
    let experience: number = 0;

    //1xp for each race, regardless of finish
    experience = results.length * 1;

    //gain xp for podiums, better spot = more xp
    results.forEach((r) => {
      if (r.overallResult == '3') {
        experience += 1;
      }
      if (r.overallResult == '2') {
        experience += 2;
      }
      if (r.overallResult == '1') {
        experience += 3;
      }
    });

    if (experience < 10) {
      this.riderRank = 'Bronze';
      this.rankCss = 'bronze';
    }
    if (experience >= 10 && experience < 30) {
      this.experienceToLevelUp =
        (30 - experience).toString() + ' xp to level up.';
      this.riderRank = 'Silver';
      this.experienceProgress = experience / 30;
      this.rankCss = 'silver';
    }
    if (experience >= 30 && experience < 70) {
      this.experienceToLevelUp =
        (70 - experience).toString() + ' xp to level up.';
      this.riderRank = 'Gold';
      this.experienceProgress = experience / 70;
      this.rankCss = 'gold';
    }
    if (experience >= 70 && experience < 120) {
      this.experienceToLevelUp =
        (120 - experience).toString() + ' xp to level up.';
      this.riderRank = 'Platinum';
      this.experienceProgress = experience / 120;
      this.rankCss = 'plat';
    }
    if (experience >= 120 && experience < 300) {
      this.experienceToLevelUp =
        (300 - experience).toString() + ' xp to level up.';
      this.riderRank = 'Diamond';
      this.experienceProgress = experience / 300;
      this.rankCss = 'diamond';
    }
    if (experience >= 300 && experience < 600) {
      this.experienceToLevelUp =
        (600 - experience).toString() + ' xp to level up.';
      this.riderRank = 'Champion';
      this.experienceProgress = experience / 600;
      this.rankCss = 'champ';
    }
    if (experience > 600) {
      this.experienceToLevelUp = 'Max Level Achieved!';
      this.riderRank = 'Master';
      this.experienceProgress = 1;
      this.rankCss = 'master';
    }
  }

  getRaceDetails(classSlug: string) {
    this.riderService.getClassDetailsByEvent(classSlug).subscribe((res) => {
      this.eventResults = res.results.sort((a, b) =>
        a.position_in_class > b.position_in_class ? 1 : -1
      );
    });
  }

  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }
}
