import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-config',
  templateUrl: './add-config.component.html',
  styleUrls: ['./add-config.component.css']
})
export class AddConfigComponent implements OnInit {

  config = new Config("default");
  projName : any;
  deviceIp : any;
  constructor(private tutorialService: DeviceService) { }

  ngOnInit(): void {
    this.projName = this.tutorialService.getProjName();
    this.deviceIp = this.tutorialService.getDeviceIp();
  }
  saveConfig()
  {
    this.tutorialService.createConfig(this.config).subscribe(data => {
      console.log(data);
    },
      error => {
        console.log(error);
      });
  }

}
