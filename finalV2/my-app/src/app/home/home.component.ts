import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Report, dataset } from '../data';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

// need to add to make leaflet icons work 
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png'; 
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

interface Templ {
  key: string;
  readers: any; 
  writers: any; 
}

interface receiveData
{
  key: string;
  data: string;
}

interface hashFormat
{
  Digest: string;
  DigestEnc: string;
  Type: string;
  Key: string;
}

function isReceiveDataArray(arr: any): arr is receiveData[] {
  return Array.isArray(arr) && arr.length > 0 && 'key' in arr[0] && 'data' in arr[0];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent {

  private map: any;
  urls: Array<string> = [];
  data: Array<Templ> = [];
  reports: Array<Report> = [];

  constructor(private http: HttpClient, private router: Router) 
  {
    this.reports = []
    this.loadData()
  }

  private async loadData() {
    try {
      const vals = await this.fetchDataFromCollection();
      if (vals) {
        this.data = vals;
        this.urls = this.data.map((templ) => templ.key);
        await this.fetchDataFromDocuments();
        for(let i of this.reports)
        {
          L.marker([parseFloat(i.data.latitude), parseFloat(i.data.longitude)]).addTo(this.map)
          .bindPopup("<b>"+i.data.locationName+"</b><br />case reported.").openPopup
        }
      } else {
        console.error('Unexpected undefined value for vals');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  private async fetchDataFromCollection(): Promise<Templ[] | undefined> {
    try {
      return await this.http.get<Array<Templ>>('https://272.selfip.net/apps/duyfK9Hnqc/collections/').toPromise();
    } catch (error) {
      console.error('Error fetching data from collection:', error);
      return undefined;
    }
  }

  private async fetchDataFromDocuments(): Promise<void> {
    for (const url of this.urls) {
      try {
        const response = await this.http.get<any>('https://272.selfip.net/apps/duyfK9Hnqc/collections/' + url + '/documents/').toPromise();
      
        if (isReceiveDataArray(response)) {
          const dataObject = JSON.parse(response[0].data);
          if(!response[0].key.includes('location'))
          {
            this.reports.push({
              key: response[0].key,
              data: dataObject
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data from documents:', error);
      }
    }
  }
  

  ngAfterViewInit(): void {
    this.map = L.map('mapid').setView([49.2,-123],11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3RhbnR5cmoiLCJhIjoiY2xwZWh3MnBuMGZkNDJrb2hwaXI2YzB5cyJ9.Dr7phV7m1-P8E0bTy5w6nQ',{
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagry 0 <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);
    
  }

  moreInfo(i: number)
  {
    dataset.pop();
    dataset.push(this.reports[i])
    this.router.navigate(['/moreInfo']);
  }

  deleteReport(i: number)
  {
    this.hashPassword(i)
  }

  async hashPassword(i:number) {
    try {
      let password = window.prompt("Enter password to hash", "");
      // Make a POST request to hash the password using MD5
      const md5HashResponse = await this.http.post<hashFormat>('https://api.hashify.net/hash/md5/hex',password).toPromise();

      if(md5HashResponse)
      {
        if(md5HashResponse.Digest === "fcab0453879a2b2281bc5073e3f5fe54")
        {
          await this.http.delete('https://272.selfip.net/apps/duyfK9Hnqc/collections/' + this.reports[i].key).toPromise();
        }
      }
      window.location.reload();
    } catch (error) {
      console.error('Error hashing password:', error);
    }
  }

  goToReport()
  {
    this.router.navigate(['/report']);
  }
}
