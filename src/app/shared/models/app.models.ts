export class Vehicle {
    _id: string;
    did: string;
    stockItem: string;
    createdDate: string;
    category: string;
    registration: string;
    regCode: string;
    price: string;
    priceChanges: PriceChange[];
}

export class PriceChange {
    newPrice: number;
    sendNotifications: boolean;
}

export class Client {
    _id: string;
    clientRef: string;
    clientType: string;
    email: string;
    deviceId: string;
    notificationsEnabled: boolean;
    createdOn: string;
    linkedVehicles: LinkedVehicle[];
}

export class LinkedVehicle {
    vehicleRegistration: string;
    watching: boolean;
}
