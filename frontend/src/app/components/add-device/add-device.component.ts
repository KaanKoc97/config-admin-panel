import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  device = new Device();
  projId : any;
  constructor(private tutorialService: DeviceService) { }

  ngOnInit(): void {
    this.projId = this.tutorialService.getProjId();
  }
  saveDevice()
  {
    this.tutorialService.createDevice(this.device).subscribe(data => {
      console.log(data);
    },
      error => {
        console.log(error);
      });
  }
}
