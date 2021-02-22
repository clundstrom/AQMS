import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  private map;
  private markerLayer: L.FeatureGroup = new L.FeatureGroup();

  ngOnInit() {
  }


  private initMap(): void {

    const kalmarCoords = [56.6634, 16.3468];

    this.map = L.map('map', {
      center: kalmarCoords,
      zoom: 14
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: ''
    }).addTo(this.map);


    this.map.addLayer(this.markerLayer);

    this.map.on('click', (e) => {
      this.markerLayer.clearLayers();
      const marker = new L.Marker([e.latlng.lat, e.latlng.lng], {clickable: true});

      marker.bindPopup('Stuff', {
        showOnMouseOver: true
      });

      this.markerLayer.addLayer(marker);
    });
  }

  ngAfterViewInit() {
    this.initMap();
  }
}
