export interface Quest {
    name: string
    description: string
    questType: number
    isCompleted: boolean
    isVisible: boolean
    parentQuestId: string
  }
  