import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  projName : any;
  constructor(private tutorialService: DeviceService, private router: Router) { }

  ngOnInit(): void {
    this.projId = this.tutorialService.getProjId();
    this.projName = this.tutorialService.getProjName();
  }
  saveDevice()
  {
    this.tutorialService.createDevice(this.device).subscribe(data => {
      console.log(data);
      this.router.navigate(['/']);
    },
      error => {
        console.log(error);
      });
  }
}
