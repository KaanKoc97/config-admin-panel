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
  currentDeviceIndex = -1;
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
    this.currentDeviceIndex = -1;
    this.currentProjectIndex = -1;
    this.currentConfigIndex = -1;
  }

  setActiveProject(project: Project, index: number): void {
    this.currentProject = new Project(project);
    this.currentProjectIndex = index;
    this.currentDeviceIndex = -1;
  }

  setActiveDevice(device: Device, index: number): void {
    this.currentDevice = new Device(device);
    this.currentDeviceIndex = index;
    this.currentConfigIndex = -1;
  }

  projectPromise(project: Project): Promise<any> {
    return new Promise<any>(async resolve => {
      project.devices?.forEach((device, index, _) => {
        for (let config of device.configs!)
          this.tutorialService.statusControl(config.configUrl)
            .subscribe(
              data => {
                console.log(data);
                if (data.Status == "timeout") {
                  this.currentProject.status = "timeout";
                  resolve("timeout");
                } else if (index == _.length - 1)
                  resolve("online");
              },
              error => {
                console.log(error);
              });
      })
    });
    
  }

  async isProjectActive(project: Project): Promise<void> {
    //let isActive = "pending";
    let isActive = await this.projectPromise(project);
    // this.currentProject.status = isActive;
    // console.log("Project Status:" + this.currentProject.status);
  }

  setActiveConfig(config: Config, index: number): void {
    this.currentConfig = new Config(config);
    this.currentConfigIndex = index;
    this.tutorialService.statusControl(this.currentConfig.configUrl)
      .subscribe(
        data => {
          console.log(data);
          this.currentConfig.status = "pending";
          this.currentConfig.status = data.Status;
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