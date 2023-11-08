export interface Quest {
    id: number
    name: string
    description: string
    questType: number
    isCompleted: boolean
    isVisible: boolean
    parentQuestId: string
  }
  