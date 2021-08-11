# Config Admin Panel
 This project is to check the availability of devices via requesting their ip and to modify its configurations in a single panel.  The structure consists of three classification which are Project, Device and Configs. Device has a unique Ip no and a list of Configs its inside. 
 In terms of Software Engineering, Projects generalize Devices and Devices generalize Configs. The program requests to Device Ips and waits for response to check the status. In addition to that, the panel has features to ADD, UPDATE and DELETE Project, Device and Configs. Projects consist of Device
which has Ip and Configurations its inside. Requests are send asynchonously to first index of the Configs because parsing of the url is required before sending the request. 
 Angular and Node.js are used to implement the project as 
frontend and backend, respectively. Object Oriented Design in the TypeScript is heavily used in the project. On the other hand, Promises/Awaits are used to control flow of executions in Node.js(backend) part of the project.
# Installation
* Clone the project
* Install the frontend via npm
* Install the backend via npm
* Install Docker Desktop and pull mongodb
* Run mongodb on Docker
* Run the backend
* Run the frontend
* Open the project on browser
## Clone the project
Git installation is required to execute the following command.
```
git clone https://github.com/KaanKoc97/config-admin-panel.git
```
Open different terminals for backend and frontend.
## Install the frontend via npm
Enter the frontend directory by the following command.
```
cd  .\frontend\
```
Install packages via npm by the following command.
```
npm install
```
## Install the backend via npm
Go back the parent directory by the following command.
```
cd  ..
```
Enter the backend directory by the following command.
```
cd  .\backend\
```
Install the packages via npm by the following command.
```
npm install
```
## Install docker and pull mongodb
Install Docker Desktop and after that at any directory run the following command.
```
docker pull mongo
```
## Run mongodb on docker
Run the image called `mongo` with 27017 as localport via Docker Desktop.

## Run the backend
Enter the backend directory and run the following command.
```
npm run start
```
## Run the frontend
Enter the frontend directory and run the following command.
```
npm run start
```
## Open project on browser
Connect http://localhost:4200 on your favorite browser.
