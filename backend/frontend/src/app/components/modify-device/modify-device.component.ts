import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-modify-device',
  templateUrl: './modify-device.component.html',
  styleUrls: ['./modify-device.component.css']
})
export class ModifyDeviceComponent implements OnInit {

  device = new Device();
  projId : any;
  projName : any;
  deviceIP : any;
  constructor(private tutorialService: DeviceService, private router:Router) { }

  ngOnInit(): void {
    this.projId = this.tutorialService.getProjId();
    this.projName = this.tutorialService.getProjName();
    this.deviceIP = this.tutorialService.getDeviceIp();
  }

  modifyDevice()
  {
    this.tutorialService.updateDevice(this.device).subscribe(data =>
      {
        console.log(data);
        this.router.navigate(['/']);
      },
      error => 
      {
        console.log(error);
        
      });
  }
}
