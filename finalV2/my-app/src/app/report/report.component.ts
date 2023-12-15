import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface receiveData
{
  key: string;
  data: string;
}

interface location
{
  locationName: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})

export class ReportComponent {
  locations: Array<location> = [];
  numLocations: number = 0;
  selectedLocation: any;
  constructor(private http: HttpClient, private router: Router) 
  {
    this.getLocations()
  }

  private async getLocations() {
    try {
      const response = await this.http.get<receiveData[]>('https://272.selfip.net/apps/duyfK9Hnqc/collections/locations/documents/').toPromise();
  
      if (response && response.length > 0) {
        const validLocations: location[] = [];
  
        for (const item of response) {
          try {
            const parsedData = JSON.parse(item.data);
            const location: location = {
              locationName: parsedData.locationName,
              latitude: parsedData.latitude,
              longitude: parsedData.longitude
            };
            validLocations.push(location);
          } catch (error) {
            console.error('Error parsing data for key', item.key, error);
            // Handle the error in another way if needed
          }
        }
        this.locations = validLocations;
      } else {
        console.error('Invalid format for response:', response);
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  }
  
  

  async submit(info: any, base: any) {
    try {
      if (base.valid) {
        if (this.selectedLocation === 'newLocation') {
          const newLocationData = {
            key: "location" + this.locations.length,
            data: JSON.stringify({
              locationName: info.locationName,
              latitude: info.latitude,
              longitude: info.longitude,
            }),
          };
  
          await this.http
            .post('https://272.selfip.net/apps/duyfK9Hnqc/collections/locations/documents/', newLocationData)
            .toPromise(); // Wait for the POST request to complete
  
          // Fetch updated locations
          await this.getLocations();
        } else {
          info['locationName'] = info.locations.locationName;
          info['latitude'] = info.locations.latitude;
          info['longitude'] = info.locations.longitude;
        }
  
        const newReport = {
          key: ((new Date()).getTime()).toString(),
          data: JSON.stringify(info),
        };
  
        // Wait for the POST request to complete
        await this.http.post('https://272.selfip.net/apps/duyfK9Hnqc/collections/', newReport).toPromise();
  
        // Wait for the POST request to complete
        await this.http.post('https://272.selfip.net/apps/duyfK9Hnqc/collections/' + newReport.key + '/documents/', newReport).toPromise();
  
        this.router.navigate(['/']);
      } else {
        window.alert("All fields must be filled properly!");
      }
    } catch (error) {
      console.error('Error in submit:', error);
      // Handle the error appropriately
    }
  }  
}
