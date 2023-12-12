import { LocationPhoto } from "./locationPhoto";

export interface Location {
    id:number;
    adminUser:string;
    campaignId:number;
    name : string;
    photoUrl : string;
    town: string;
    isVisible: boolean;
    description:string;
    locationPhotos: LocationPhoto[];
}
