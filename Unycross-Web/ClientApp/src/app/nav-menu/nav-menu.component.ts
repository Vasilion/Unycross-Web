import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RacerProfile } from '../interfaces/rider';
import { RiderService } from '../services/rider.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  isExpanded = false;
  cleanProfile: RacerProfile;
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private riderService: RiderService
  ) {}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  };

  logOut = () => {
    localStorage.clear();
    this.riderService.updateLocalProfile(this.cleanProfile);
    this.router.navigate(['/']);
  };
}
