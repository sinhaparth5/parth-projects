export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
    public: {
        Tables: {
            projects: {
                Row: {
                    id: string  // Changed to string for UUID
                    slug: string
                    title: string
                    body: string
                    github_link: string | null
                    thumbnail_image: string | null  // Added thumbnail image
                    created_at: string
                    updated_at: string
                    user_id: string
                }
                Insert: {
                    id?: string  // Changed to string for UUID
                    slug: string
                    title: string
                    body: string
                    github_link?: string | null
                    thumbnail_image?: string | null  // Added thumbnail image
                    created_at?: string
                    updated_at?: string
                    user_id: string
                }
                Update: {
                    id?: string  // Changed to string for UUID
                    slug?: string
                    title?: string
                    body?: string
                    github_link?: string | null
                    thumbnail_image?: string | null  // Added thumbnail image
                    created_at?: string
                    updated_at?: string
                    user_id?: string
                }
            }
            project_images: {
                Row: {
                    id: string  // Changed to string for UUID
                    project_id: string  // Changed to string for UUID
                    image_url: string
            }
                Insert: {
                    id?: string  // Changed to string for UUID
                    project_id: string  // Changed to string for UUID
                    image_url: string
            }
            Update: {
                    id?: string  // Changed to string for UUID
                    project_id?: string  // Changed to string for UUID
                    image_url?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}

export interface Project {
    id: string  // Changed to string for UUID
    slug: string
    title: string
    body: string
    github_link: string | null
    thumbnail_image: string | null  // Added thumbnail image
    created_at: string
    updated_at: string
    user_id: string
    // Nested relations
    project_images?: ProjectImage[]
}
  
export interface ProjectImage {
    id: string  // Changed to string for UUID
    project_id: string  // Changed to string for UUID
    image_url: string
}
  
  // Form data types
export interface ProjectFormData {
    title: string
    slug: string
    body: string
    github_link?: string | null
    thumbnail_image?: File | null  // Added thumbnail image as File
    images?: File[]
}