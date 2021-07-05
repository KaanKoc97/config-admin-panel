export class Project {
    id?: any;
    projectName?: string;
    devices?: Array<Device>;
    status?: string;
    constructor(obj?:any)
    {
      this.id = obj ? obj.id ? obj.id:obj._id ? obj._id:null:null
      this.projectName = obj ? obj.projectName ? obj.projectName:null:null
      this.devices = obj ? obj.devices ? obj.devices:null:null
      this.status = obj ? obj.status ? obj.status:'pending':'pending'
    }
  }


export class Device{
  ip_no? : string;
  configs? : Array<Config>
  status? : string;
  constructor(obj? :any)
  {
    this.ip_no = obj ? obj.ip_no ? obj.ip_no:null:null
    this.configs = obj ? obj.configs ? obj.configs:null:null
    this.status = obj ? obj.status ? obj.status:'pending':'pending'
  }
}

export class Config
{
    appName? : string;
    configUrl? : string;
    configUpdateUrl? : string;
    configReload? : string;
    logUrl? : string;
    logUpdateUrl? :string;
    logReload? : string;
    serverLog? : string;
    version? : string;
    checkStatus? : string;
    configurationMD? : string;
    gitSource? : string;
    status? : string;
    constructor(obj:any)
    {
      this.appName = obj ? obj.appName ? obj.appName:obj.appName ? obj.appName:null:null
      this.configUrl = obj ? obj.configUrl ? obj.configUrl:null:null
      this.configUpdateUrl = obj ? obj.configUpdateUrl ? obj.configUpdateUrl:null:null   
      this.configReload = obj ? obj.configReload ? obj.configReload:null:null
      this.logUrl = obj ? obj.logUrl ? obj.logUrl:null:null   
      this.logUpdateUrl = obj ? obj.logUpdateUrl ? obj.logUpdateUrl:null:null
      this.version = obj ? obj.version ? obj.version:null:null
      this.logReload = obj ? obj.logReload ? obj.logReload:null:null 
      this.serverLog = obj ? obj.serverLog ? obj.serverLog:null:null
      this.checkStatus = obj ? obj.checkStatus ? obj.checkStatus:null:null
      this.configurationMD = obj ? obj.configurationMD ? obj.configurationMD:null:null
      this.gitSource = obj ? obj.gitSource ? obj.gitSource:null:null
      this.status = obj ? obj.status ? obj.status:"pending":"pending"
    }
}
