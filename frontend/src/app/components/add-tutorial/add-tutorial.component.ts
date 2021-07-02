import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  project = new Project(); 

  constructor(private tutorialService: DeviceService) { }

  ngOnInit(): void {
  }

  saveProject(): void {
    const data = {
      ip_no: this.project.projectName,
    };

    this.tutorialService.create(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  newProject(): void {
    this.project = {
      projectName: "",
    };
  }
}