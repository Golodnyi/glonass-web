export interface IBattery {
    powerVoltage: number;
    charging: boolean;
    chargeVoltage: number;
    chargeLevel: number;
}

export class Battery implements IBattery {
    public powerVoltage: number;
    public charging: boolean;
    public chargeVoltage: number;
    public chargeLevel: number;
}
