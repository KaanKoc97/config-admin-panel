import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device, Config, Project } from '../models/device.model';

const baseUrl = 'http://192.168.30.12:8080';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(baseUrl);
  }

  get(id: any): Observable<Project> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  projectStatusCheck(project : Project): Observable<any>
  {
    return this.http.post(baseUrl + "/projectCheck", project);
  }

  deviceStatusCheck(device : Device): Observable<any>
  {
    return this.http.post(baseUrl + "/deviceCheck", device);
  }

  createProject(data: any): Observable<any> {
    return this.http.post(baseUrl + "/addProject", data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteProject(id: any): Observable<any> {
    return this.http.delete(baseUrl+ '/' + id);
  }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

  findByTitle(title: any): Observable<Project[]> {
    return this.http.get<Project[]>(`${baseUrl}?title=${title}`);
  }
}