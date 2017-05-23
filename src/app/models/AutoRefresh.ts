export interface IAutoRefresh {
  enabled: boolean;
  afterTime: number;
}

export class AutoRefresh implements IAutoRefresh {
  public enabled = false;
  public afterTime = Date.now() - 1000;
}
