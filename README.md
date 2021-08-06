# Config Admin Panel
This project is to check the availability of a device via its ip and to modify its configurations in a single panel. Angular and Node.js are used to implement the project as 
frontend and backend, respectively. The structure consists of three classification which are Project, Device and Configs. Device has a unique Ip no and a list of Configs its inside. The pannel requests asynchonously
 In terms of Software Engineering, Project generalize Devices and Devices generalize Configs. The program requests to Device Ips and waits for response to check the status. In addition to that, the panel has features to ADD, UPDATE and DELETE Project, Device and Configs. Projects consist of Device
which has Ip and Configurations its inside. Requests are send to first index of the Configs because parsing of the url is required before sending the request. 

# Installation

