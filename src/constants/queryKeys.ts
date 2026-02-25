export const queryKeys = {
  problems: ['problems'] as const,
  problemList: (filters?: Record<string, unknown>) => ['problems', 'list', filters ?? {}] as const,
  problemDetail: (id: string) => ['problems', id] as const,
  user: ['user'] as const,
  notifications: ['notifications'] as const,
}
