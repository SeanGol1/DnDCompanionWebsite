import { NpcPhoto } from "./npcPhoto"
export interface Npc {
  id: number;
  adminUser: string;
  campaignId: number;
  campaignName: string;
  characterName: string;
  photoUrl: string;
  livesIn: string;
  isVisible: boolean;
  race: string;
  class: string;
  description: string;
  strength: string;
  dexterity: string;
  constitution: string;
  intelligence: string;
  wisdom: string;
  charisma: string;
  npcPhotos: NpcPhoto[];

}

