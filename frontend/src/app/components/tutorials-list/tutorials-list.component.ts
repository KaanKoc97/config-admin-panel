import { Component, OnInit } from '@angular/core';
import { Config, Device, Project } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/tutorial.service';
import { interval, Observable, Subscription } from 'rxjs';
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
  currentDeviceIndex = -1;
  currentProjectIndex = -1;
  currentConfigIndex = -1;
  title = '';

  projectTimer = setInterval(()=>{
    this.isProjectActive(this.currentProject, this.currentProjectIndex)
  }, 20000);
  
  constructor(private tutorialService: DeviceService) {
  }

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
    this.currentDeviceIndex = -1;
    this.currentProjectIndex = -1;
    this.currentConfigIndex = -1;
  }

  setActiveProject(project: Project, index: number): void {
    this.currentProject = new Project(project);
    this.currentProjectIndex = index;
    this.currentDeviceIndex = -1;
  }

  isProjectActive(project: Project, index: number): void {
    this.currentProject = new Project(project);
    this.currentProjectIndex = index;
    this.currentProject.devices?.forEach((value, index) => {
      this.currentProject.devices![index].status = "pending";
      this.tutorialService.deviceStatusCheck(value)
        .subscribe(data => {
          this.currentProject.devices![index].status = data.Status;
        })
    })
  }

  isDeviceActive(device: Device, index: number): void {
    const foundIndex = this.currentProject.devices?.findIndex(x => x === device);
    this.currentProject.devices![foundIndex!].status = "pending";
    this.currentProject.devices![foundIndex!] = device;
    this.currentDevice = device;
    this.currentDeviceIndex = index;
    this.tutorialService.deviceStatusCheck(device).subscribe(data => {
      console.log(data);
      this.currentProject.devices![foundIndex!].status = data.Status;
    });

  }

  isConfigActive(config: Config, index: number): void {
    const foundIndex = this.currentDevice.configs?.findIndex(x => x === config);
    this.currentDevice.configs![foundIndex!].status = "pending";
    this.currentDevice.configs![foundIndex!] = config;
    this.currentConfig = config;
    this.currentConfigIndex = index;
    this.tutorialService.configStatusCheck(this.currentConfig)
      .subscribe(
        data => {
          console.log(data);
          this.currentDevice.configs![foundIndex!].status = data.Status;
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