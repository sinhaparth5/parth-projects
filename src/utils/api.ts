import { supabase } from './supabase'
import type { Project, ProjectFormData, ProjectImage } from './types/database';

/**
 * Fetch a project by its slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_images (*)
    `)
    .eq('slug', slug)
    .single()
    
  if (error) {
    console.error(`Error fetching project with slug ${slug}:`, error)
    return null
  }
  
  return data as Project
}

/**
 * Fetch all projects
 */
export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_images (*)
    `)
    .order('created_at', { ascending: false })
    
  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }
  
  return data as Project[]
}

/**
 * Create a new project
 */
export async function createProject(project: ProjectFormData, userId: string): Promise<Project | null> {
  try {
    // Insert the project
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          slug: project.slug,
          title: project.title,
          body: project.body,
          github_link: project.github_link,
          user_id: userId
        }
      ])
      .select()
      
    if (error) {
      throw error
    }
    
    if (!data || data.length === 0) {
      throw new Error('Failed to create project')
    }
    
    // If there are images, upload them to storage and create records
    if (project.images && project.images.length > 0) {
      const imageUrls: string[] = []
      
      for (const image of project.images) {
        const filename = `${Date.now()}-${image.name}`
        
        // Upload image to storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(filename, image)
          
        if (uploadError) {
          throw uploadError
        }
        
        // Get the public URL
        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(filename)
          
        imageUrls.push(urlData.publicUrl)
      }
      
      // Insert image records
      if (imageUrls.length > 0) {
        const imageInserts = imageUrls.map(url => ({
          project_id: data[0].id,
          image_url: url
        }))
        
        const { error: imageError } = await supabase
          .from('project_images')
          .insert(imageInserts)
          
        if (imageError) {
          throw imageError
        }
      }
    }
    
    return data[0] as Project
  } catch (error) {
    console.error('Error creating project:', error)
    return null
  }
}

/**
 * Delete a project
 */
export async function deleteProject(projectId: number): Promise<boolean> {
  try {
    // Delete the project (cascade will delete images)
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)
      
    if (error) {
      throw error
    }
    
    return true
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error)
    return false
  }
}