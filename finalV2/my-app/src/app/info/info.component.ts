import { Component } from '@angular/core';
import { dataset, Report} from '../data';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  myReport: Report = dataset[0];
  theDate: Date = new Date(parseInt(this.myReport.key));
}
