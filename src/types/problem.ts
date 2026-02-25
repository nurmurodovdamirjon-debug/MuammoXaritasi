export interface Problem {
  id: string
  user_id: string
  title: string
  description: string
  category: Category
  priority: Priority
  status: ProblemStatus
  location: GeoPoint
  address: string
  district: District
  images: string[]
  votes_count: number
  ai_analysis?: AIAnalysis
  assigned_agency?: Agency
  created_at: string
  updated_at: string
  resolved_at?: string
}

export type Category = 'school' | 'medical' | 'road' | 'lighting' | 'water' | 'other'
export type Priority = 'low' | 'medium' | 'high' | 'critical'
export type ProblemStatus = 'pending' | 'accepted' | 'in_progress' | 'resolved' | 'rejected'
export type Agency = 'education' | 'health' | 'transport' | 'utilities' | 'construction' | 'municipality'
export type District = 'yunusobod' | 'chilonzor' | 'mirzo_ulugbek' | 'shayxontohur' | 'uchtepa' | 'yakkasaroy' | 'olmazar' | 'bektemir'

export interface GeoPoint {
  lat: number
  lng: number
}

export interface AIAnalysis {
  category: Category
  priority: Priority
  agency: Agency
  estimated_days: number
  similar_count: number
  confidence: number
  summary_uz: string
}
