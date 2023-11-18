import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Racer } from '../interfaces/rider';
import { RiderService } from '../services/rider.service';

@Component({
  selector: 'app-rider-search',
  templateUrl: './rider-search.component.html',
  styleUrls: ['./rider-search.component.css'],
})
export class RiderSearchComponent implements OnInit {
  racerList: Racer[] = [];
  searchNode = document.getElementById('rider-search');
  constructor(private riderService: RiderService) {}

  ngOnInit(): void {}

  public riderLookup(rider: string): any {
    this.racerList = [];
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
    });
    console.log(this.racerList);
  }

  // public listenToSearch(rider: string): void {
  //   this.searchNode?.addEventListener('keyup', (event: KeyboardEvent) => {
  //     if (event.key === 'Enter') {
  //       this.riderLookup(rider);
  //     }
  //   });
  // }
}
