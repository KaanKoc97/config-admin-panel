import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device, Config, Project } from '../models/device.model';

const baseUrl = 'http://192.168.14.15:8080';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  projId : any;
  projName : any;
  deviceIp : any;
  constructor(private http: HttpClient) { }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(baseUrl);
  }

  get(id: any): Observable<Project> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getProjId(): Observable<any>
  {
    return this.projId;
  }
  
  setProjId(projId: any)
  {
    this.projId = projId;
  }

  getProjName() : Observable<any>
  {
    return this.projName;
  }

  setProjName(projName: any)
  {
    this.projName = projName;
  }

  getDeviceIp() : Observable<any>
  {
    return this.deviceIp;
  }

  setDeviceIp(deviceIp: any)
  {
    this.deviceIp = deviceIp;
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

  createDevice(device: Device): Observable<any>
  {
    return this.http.post(baseUrl + "/addDevice/" + this.getProjId(), device);
  }

  createConfig(config : Config): Observable<any>
  {
    return this.http.post(baseUrl + "/addConfig/" + this.getProjId() + '/' + this.getDeviceIp(), config);
  }

  deleteDevice(id: any): Observable<any>
  {
    return this.http.delete(baseUrl + '/deleteDevice/' + id);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteProject(id: any): Observable<any> {
    return this.http.delete(baseUrl+ '/' + id);
  }

  findByTitle(title: any): Observable<Project[]> {
    return this.http.get<Project[]>(`${baseUrl}?title=${title}`);
  }
}
