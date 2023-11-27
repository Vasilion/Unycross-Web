import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-track-finder',
  templateUrl: './track-finder.component.html',
  styleUrls: ['./track-finder.component.css'],
})
export class TrackFinderComponent implements OnInit {
  tracksJson: any[];
  constructor() {}

  ngOnInit(): void {
    this.tracksJson = require('../utilities/tracks.json');
    console.log(this.tracksJson);
    this.initGoogleMap();
  }

  initGoogleMap(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyBZivOLwRx_PuyTkHNOnTvjSFK6YDAQoHg',
    });

    loader.importLibrary('maps').then(() => {
      let lat = 0;
      let long = 0;
      let map = new google.maps.Map(document.getElementById('map')!, {
        center: { lat: 37.0902, lng: -95.7129 },
        zoom: 5,
      });

      this.tracksJson.forEach((track: any) => {
        lat = Number(track.lat);
        long = Number(track.lon);

        const marker = new google.maps.Marker({
          map: map,
          position: { lat: lat, lng: long },
          title: track.name,
        });

        const infowindow = new google.maps.InfoWindow({
          content: '<h1>' + track.name + '</h1>' + '<p>' + track.desc + '</p>',
          ariaLabel: 'test',
        });

        marker.addListener('click', () => {
          infowindow.open({
            anchor: marker,
            map,
          });
        });
      });
    });
  }
}
