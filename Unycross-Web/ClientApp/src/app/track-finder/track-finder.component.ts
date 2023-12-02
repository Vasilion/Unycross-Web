import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Loader } from '@googlemaps/js-api-loader';
import { Track, TracksCodegenService } from '../api';
import { Marker, TrackWeather } from '../interfaces/rider';
import { RiderService } from '../services/rider.service';

@Component({
  selector: 'app-track-finder',
  templateUrl: './track-finder.component.html',
  styleUrls: ['./track-finder.component.css'],
})
export class TrackFinderComponent implements OnInit {
  zipCodeField: FormControl = new FormControl(null, []);
  userRadius: FormControl = new FormControl(null, []);
  tracks: Track[] = [];
  trackWeather: TrackWeather;
  defaultRadius: number = 50;
  raidusMarkers: Marker[] = [];
  radiusCircle: google.maps.Circle;
  radius: number = 80; //killometers 1 mile/ 1.6 km
  zipCoords: Marker | null;
  map: google.maps.Map;
  constructor(
    private riderService: RiderService,
    private TrackCodegenService: TracksCodegenService
  ) {}

  ngOnInit(): void {
    this.TrackCodegenService.apiTracksGet().subscribe((tracks: Track[]) => {
      // console.log(tracks);
      tracks.forEach((track) => {
        let newTrack: Track = {
          id: track.id,
          name: track.name,
          description: track.description,
          latitude: track.latitude,
          longitude: track.longitude,
          slug: track.slug,
          status: track.status,
        };
        this.tracks.push(newTrack);
      });
      this.initGoogleMap(37.0902, -95.7129, 5);
    });
  }

  async setZipCoords() {
    this.zipCoords = await this.getCoordinatesFromZipCode(
      this.zipCodeField.value
    );
  }

  initGoogleMap(centerLat: number, centerLong: number, zoom: number): void {
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
        center: { lat: centerLat, lng: centerLong },
        zoom: zoom,
      });

      //sets class level map for radius drawing
      this.map = map;

      google.maps.event.addListener(map, 'mouseover', (event) => {
        map.setOptions({ scrollwheel: true });
      });

      this.tracks.forEach((track: Track) => {
        contentString = '<h1>' + track.name + '</h1>';
        lat = Number(track.latitude);
        long = Number(track.longitude);
        this.raidusMarkers.push({ lat: lat, lng: long });

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
            .getTrackWeather(Number(track.latitude), Number(track.longitude))
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

  calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number {
    // Implementation of haversine formula to calculate distance between two coordinates
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  }

  findMarkersInRadius(
    zipcode: string,
    radius: number,
    markers: Marker[]
  ): Marker[] {
    // Assume you have a function to convert zip code to coordinates
    const zipCodeCoordinates = this.zipCoords;

    if (!zipCodeCoordinates) {
      console.error(`Invalid zip code: ${zipcode}`);
      return [];
    }

    // Filter markers within the specified radius
    const markersInRadius = markers.filter((marker) => {
      const distance = this.calculateDistance(
        zipCodeCoordinates.lat,
        zipCodeCoordinates.lng,
        marker.lat,
        marker.lng
      );

      return distance <= radius;
    });

    return markersInRadius;
  }

  async getCoordinatesFromZipCode(zipcode: string): Promise<Marker | null> {
    const apiKey = 'AIzaSyBZivOLwRx_PuyTkHNOnTvjSFK6YDAQoHg'; // Replace with your actual API key

    const geocodingEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      zipcode
    )}&key=${apiKey}`;

    try {
      const response = await fetch(geocodingEndpoint);
      const data = await response.json();

      if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        console.error(`No coordinates found for zip code: ${zipcode}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching coordinates: ${error}`);
      return null;
    }
  }

  drawRadius(map: google.maps.Map, center: Marker, radius: number): void {
    this.radiusCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: { lat: Number(center.lat), lng: Number(center.lng) },
      radius: radius * 1000, // Convert radius from kilometers to meters
    });
  }

  setMapZoom(radius: number): void {
    if (radius <= 50 * 1.6) {
      this.map.setZoom(5);
    }
    if (radius > 50 * 1.6 || radius <= 100 * 1.6) {
      this.map.setZoom(8);
    } else {
      this.map.setZoom(11);
    }
  }

  async searchByRadiusOfZipCode() {
    await this.setZipCoords();
    let markers: Marker[] = this.findMarkersInRadius(
      this.zipCodeField.value,
      Number(this.userRadius.value) * 1.6,
      this.raidusMarkers
    );

    //line below clears circles, remove this if u want to allow for multiple radius circles on same map
    if (this.radiusCircle != undefined) {
      this.radiusCircle.setMap(null);
    }

    //THIS NEEDS IMPROVEMENT, NEED TO FIND CENTER OF RADIUS NOT PASS IN MARKER FROM RESULTS, CURRENTLY, IT IS CENTERING OFF A RANDOM MARKER IN THE RESULT SET FROM FIND MARKERS IN RADIUS. ZOOM SETTINGS COULD ALSO USE WORK
    this.drawRadius(this.map, markers[0], Number(this.userRadius.value) * 1.6);
    this.map.setCenter({
      lat: Number(markers[0].lat),
      lng: Number(markers[0].lng),
    });
    this.setMapZoom(Number(this.userRadius.value) * 1.6);
  }
}
