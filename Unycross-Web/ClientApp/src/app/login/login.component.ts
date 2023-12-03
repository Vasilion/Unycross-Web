import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subject, switchMap, takeUntil } from 'rxjs';

import { Login, Rider, User, UsersCodegenService } from '../api';
import { AuthenticatedResponse } from '../interfaces/auth';
import {
  Racer,
  RacerProfile,
  RacerProfileRaceResult,
} from '../interfaces/rider';
import { RiderService } from '../services/rider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  credentials: Login = { userName: '', password: '' };
  form: FormGroup;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private userService: UsersCodegenService,
    private riderService: RiderService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login = (): void => {
    if (this.form.valid) {
      this.credentials.userName = this.form.controls['username'].value;
      this.credentials.password = this.form.controls['password'].value;
      this.invalidLogin = true; // this needs work, shows invalid message for split second but best work around i found since on invalid it stops at first switchmap
      this.http
        .post<AuthenticatedResponse>(
          'https://localhost:7224/api/auth/login',
          this.credentials,
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          }
        )
        .pipe(
          takeUntil(this.destroy$),
          switchMap((response: AuthenticatedResponse): Observable<any> => {
            if (response) {
              const token = response.token;
              localStorage.setItem('jwt', token);
              this.invalidLogin = false;
              return this.userService.apiUsersGet(
                this.form.controls['username'].value,
                this.form.controls['password'].value
              );
            }
            return of(null);
          }),
          switchMap((user: User): Observable<any> => {
            if (user.amaNumber) {
              return this.riderService.getRacerList(user.amaNumber);
            }
            this.router.navigate(['/home']);
            return of(null);
          }),
          switchMap((riders: any): Observable<any> => {
            if (riders) {
              let loggedInRacer: Racer = {
                name: '',
                slug: '',
                state: '',
                city: '',
              };
              riders.data.forEach((element) => {
                let racer: Racer = {
                  name: element.name,
                  slug: element.slug,
                  state: element.state,
                  city: element.city,
                };
                loggedInRacer = racer;
              });
              return this.riderService.getRacerProfile(loggedInRacer.slug);
            }
            return of(null);
          })
        )
        .subscribe((res) => {
          let allRaces: RacerProfileRaceResult[] = [];
          if (!res) {
            this.router.navigate(['/home']);
            return;
          }
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
          this.riderService.localProfile = racerProfileResponse; // this should be stored in local storage since we could lose state after login page potentially. Rider Profile should then get it from local storage instead of this var.
          this.router.navigateByUrl('/rider-profile');
        });
    }
  };
}
