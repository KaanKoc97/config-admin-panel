import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
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
  currentProjectIndex = -1;
  currentDeviceIndex = -1;
  currentConfigIndex = -1;
  title = '';
  projectTimer = setInterval(() => {
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
    this.currentDevice = new Device("default");
    this.currentConfig = new Config("default");
    this.currentProjectIndex = index;
    this.currentDeviceIndex = -1;
    this.currentConfigIndex = -1;
  }

  setActiveDevice(device: Device, index: number): void {
    this.currentDevice = new Device(device);
    this.currentConfig = new Config("default");
    this.currentDeviceIndex = index;
    this.currentConfigIndex = -1;
  }

  setActiveConfig(config: Config, index: number): void {
    this.currentConfig = new Config(config);
    this.currentConfigIndex = index;
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

  async deletePromise(project: Project) {
    if (confirm("Are you sure to delete this project?")) {
      const index = this.projects?.findIndex(x => x === project);
      this.tutorialService.deleteProject(this.projects![index!]._id).subscribe(data => {
        console.log(data);
      },
        error => {
          console.log(error);
        });
    }
  }

  async deleteProject(project: Project) {
    await this.deletePromise(project);
    location.reload();
  }

  // removeAllProjects(): void {
  //   this.tutorialService.deleteAll()
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.refreshList();
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

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