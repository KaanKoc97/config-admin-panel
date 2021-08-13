# Config Admin Panel
 This project is to check the availability of devices via requesting their ip and to modify its configurations in a single panel.  The structure consists of three classification which are Project, Device and Configs. Device has a unique Ip no and a list of Configs its inside. 
 In terms of Software Engineering, Projects generalize Devices and Devices generalize Configs. The program requests to Device Ips and waits for response to check the status. In addition to that, the panel has features to ADD, UPDATE and DELETE Project, Device and Configs. Projects consist of Device
which has Ip and Configurations its inside. Requests are send asynchonously to first index of the Configs because parsing of the url is required before sending the request. 
 Angular and Node.js are used to implement the project as 
frontend and backend, respectively. Object Oriented Design in the TypeScript is heavily used in the project. On the other hand, Promises/Awaits are used to control flow of executions in Node.js(backend) part of the project.
# Installation
  * Clone the project
  * Compose the project in a single container by Docker
  * Open the project on browser
# Method 
## Clone the project
Git installation is required to execute the following command.
```
git clone https://github.com/KaanKoc97/config-admin-panel.git
```
## Dockerize the project
Dockor-compose is reqiured to execute the following commmand inside the root directory.
```
docker-compose up -d
```
## Open project on browser
Connect http://localhost:4200 on your favorite browser.
