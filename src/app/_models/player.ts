import { CharacterPhoto } from "./characterPhoto"

export interface Player {
  id:number;
  userName : string;
  characterName: string;
  campaignId:number;
  campaignName: string;
  characterSheetLink: string;
  dndBeyondPcId:string;
  photoUrl: string;
  race:string;
  class: string;
  secondaryClass: string;
  description: string;
  backgroundName:string;
  backgroundDescription : string;
  strength : string;
  dexterity : string;
  constitution : string;
  intelligence: string;
  wisdom : string;
  charisma : string;
  photos: CharacterPhoto[]
}
  