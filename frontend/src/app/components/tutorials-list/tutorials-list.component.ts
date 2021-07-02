import { Component, OnInit } from '@angular/core';
import { Config, Device, Project } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  projects?: Project[];
  currentProject: Project = new Project("default");
  currentDevice: Device = new Device("default");
  currentConfig: Config = new Config("default");
  currentDeviceIndex = -1
  currentProjectIndex = -1;
  currentConfigIndex = -1;

  title = '';

  constructor(private tutorialService: DeviceService) { }

  ngOnInit(): void {
    this.retrieveProjects();
  }

  retrieveProjects(): void {
    this.tutorialService.getAll()
      .subscribe(
        data => {
          this.projects = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveProjects();
    this.currentProject = new Project("default");
    this.currentDevice = new Device("default");
    this.currentConfig = new Config("default");
    this.currentDeviceIndex = -1
    this.currentProjectIndex = -1;
    this.currentConfigIndex = -1;
  }

  setActiveProject(project: Project, index: number): void {
    this.currentProject = new Project(project);
    this.currentProjectIndex = index;
    this.currentDeviceIndex = -1;
    console.log(this.currentProject.devices?.map(item => item.ip_no));
  }

  setActiveDevice(device: Device, index: number): void {
    this.currentDevice = new Device(device);
    this.currentDeviceIndex = index;
    this.currentConfigIndex = -1;
    for (let config of this.currentDevice.configs!) {
      this.tutorialService.statusControl(config.configUrl)
        .subscribe(
          data => {
            console.log(data);
            this.currentProject.devices!.find(item =>item.ip_no == this.currentDevice.ip_no)!.status = 'pending';
            if (data.Status == "online") {
              this.currentProject.devices!.find(item =>item.ip_no == this.currentDevice.ip_no)!.status = 'online';
              //this.currentDevice.status = "online";
            }
            else if (data.Status == "timeout") {
              //this.currentDevice.status = "timeout";
              this.currentProject.devices!.find(item =>item.ip_no == this.currentDevice.ip_no)!.status = 'timeout';
            }
            else if (data.Status == "pending") {
              //this.currentDevice.status = "pending";
              this.currentProject.devices!.find(item =>item.ip_no == this.currentDevice.ip_no)!.status = 'pending';
            }
          },
          error => {
            console.log(error);
          });
    }

  }

  setActiveConfig(config: Config, index: number): void {
    this.currentConfig = new Config(config);
    this.currentConfigIndex = index;
    this.tutorialService.statusControl(this.currentConfig.configUrl)
      .subscribe(
        data => {
          console.log(data);
          if (data.Status == "online") {
            this.currentConfig.status = "online";
          }
          else if (data.Status == "timeout") {
            this.currentConfig.status = "timeout";
          }
          else if (data.Status == "pending") {
            this.currentConfig.status = "pending";
          }
        },
        error => {
          console.log(error);
        });
  }


  removeAllProjects(): void {
    this.tutorialService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.currentProject = {};
    this.currentProjectIndex = -1;

    this.tutorialService.findByTitle(this.title)
      .subscribe(
        data => {
          this.projects = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}