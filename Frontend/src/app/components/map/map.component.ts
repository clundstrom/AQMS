import { AfterViewInit, Component, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { EventEmitter } from '@angular/core';


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
  @Output() clicked = new EventEmitter<string>();


  ngOnInit() {

  }


  private initMap(): void {


    var customDefault = L.icon({
			iconUrl: 'assets/marker-icon.png',
			shadowUrl: 'assets/marker-shadow.png',
		});

    L.Marker.prototype.options.icon = customDefault;

    const kalmarCoords = [56.6634, 16.3468];

    this.map = L.map('map', {
      center: kalmarCoords,
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: ''
    }).addTo(this.map);


    this.map.addLayer(this.markerLayer);

    var streets = [];
    var sjobrings = L.marker([56.661671, 16.325510]).addTo(this.map);
    sjobrings.bindPopup("<b>Sjöbrings väg</b>").openPopup();
    sjobrings.on('click', () => { this.clicked.emit("http://85.228.187.157:3000/d-solo/4Yn8LwyMz/sjobrings"); })


    var vapnareg = L.marker([56.68428869110707, 16.34386830396531]).addTo(this.map);
    vapnareg.bindPopup("<b>Väpnaregatan</b>");
    vapnareg.on('click', () => { this.clicked.emit("http://85.228.187.157:3000/d-solo/fxArqbUGz/vapnareg"); })

    streets.push(sjobrings);
    streets.push(vapnareg);

    streets.forEach(element => {
      element.on('mouseover', function (e) {
        this.openPopup();

      })

      element.on('mouseout', function (e) {
        this.closePopup();
      })
    });




  }

  ngAfterViewInit() {
    this.initMap();
  }

}
