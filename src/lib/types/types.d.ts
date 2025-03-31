export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
  }
  
  export interface Particle {
    x: number;
    y: number;
    radius: number;
    speedX: number;
    speedY: number;
    color: string;
  }