export interface NotificationItem {
  id: string
  type: 'status' | 'solved' | 'votes' | 'system' | 'xp' | 'badge'
  title: string
  description: string
  created_at: string
  read: boolean
}

export const notificationService = {
  async getList(): Promise<NotificationItem[]> {
    return []
  },
  async markRead(id: string): Promise<void> {
    void id
  },
}
