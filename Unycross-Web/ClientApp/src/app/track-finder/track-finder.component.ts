import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { TrackWeather } from '../interfaces/rider';
import { RiderService } from '../services/rider.service';

@Component({
  selector: 'app-track-finder',
  templateUrl: './track-finder.component.html',
  styleUrls: ['./track-finder.component.css'],
})
export class TrackFinderComponent implements OnInit {
  tracksJson: any[];
  trackWeather: TrackWeather;
  constructor(private riderService: RiderService) {}

  ngOnInit(): void {
    this.tracksJson = require('../utilities/tracks.json');
    this.initGoogleMap();
  }

  initGoogleMap(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyBZivOLwRx_PuyTkHNOnTvjSFK6YDAQoHg',
    });

    loader.importLibrary('maps').then(() => {
      let lat = 0;
      let long = 0;
      let contentString: string = '';
      let infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: 'test',
      });
      let map = new google.maps.Map(document.getElementById('map')!, {
        center: { lat: 37.0902, lng: -95.7129 },
        zoom: 5,
      });

      google.maps.event.addListener(map, 'mouseover', (event) => {
        map.setOptions({ scrollwheel: true });
      });

      this.tracksJson.forEach((track: any) => {
        contentString = '<h1>' + track.name + '</h1>';
        lat = Number(track.lat);
        long = Number(track.lon);

        const marker = new google.maps.Marker({
          map: map,
          position: { lat: lat, lng: long },
          title: track.name,
        });

        google.maps.event.addListener(map, 'click', (event) => {
          if (infowindow) {
            infowindow.close();
          }
        });

        marker.addListener('click', () => {
          infowindow.close();
          contentString = '<h3>Loading...</h3>';
          infowindow = new google.maps.InfoWindow({
            content: contentString,
            ariaLabel: 'test',
          });
          this.riderService
            .getTrackWeather(Number(track.lat), Number(track.lon))
            .subscribe((weather) => {
              this.trackWeather = {
                city: weather.location.name,
                state: weather.location.region,
                temp: weather.current.temp_f,
                condition: weather.current.condition.text,
                img: weather.current.condition.icon,
              };
              contentString =
                '<div style="text-align: center;"><h2>' +
                track.name +
                '</h2>' +
                '<span>' +
                this.trackWeather.city +
                ', ' +
                this.trackWeather.state +
                '</span>' +
                '<p><br /><img src ="' +
                this.trackWeather.img +
                '" />' +
                '<span><br />' +
                this.trackWeather.temp +
                '°</span>' +
                '<span> ' +
                this.trackWeather.condition +
                '</span></p></div>';
              infowindow.setContent(contentString);
            });
          infowindow.open({
            anchor: marker,
            map,
          });
        });
      });
    });
  }
}
