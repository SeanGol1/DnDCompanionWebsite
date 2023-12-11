import { CharacterPhoto } from "./characterPhoto"
export interface Location {
    id:number;
    adminUser:string;
    campaignId:number;
    name : string;
    image : string;
    town: string;
    isVisible: boolean;
    description:string;
    photos: CharacterPhoto[];
}
