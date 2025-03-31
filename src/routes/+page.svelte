<script lang="ts">
    import { onMount } from 'svelte';
    import type { Project, Particle } from '../lib/types/types';
    import projectsData from '../lib/schema/projects.json';
    import styles from '../lib/css/front.module.css';
    import { Image } from '@unpic/svelte';

    const projects: Project[] = projectsData;
    
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    let particles: Particle[] = [];
    
    onMount(() => {
      if (canvas) {
        ctx = canvas.getContext('2d');
        
        if (ctx) {
          initCanvas();
          createParticles();
          animateParticles();
          
          // Resize handler
          const handleResize = (): void => {
            initCanvas();
            createParticles();
          };
          
          window.addEventListener('resize', handleResize);
          
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }
      }
    });
    
    function initCanvas(): void {
      if (canvas && ctx) {
        canvas.width = window.innerWidth;
        canvas.height = 500; // Fixed height for hero section
      }
    }
    
    function createParticles(): void {
      if (!canvas || !ctx) return;
      
      particles = [];
      const particleCount = Math.floor(canvas.width * canvas.height / 10000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(74, 144, 226, ${Math.random() * 0.5 + 0.25})`
        });
      }
    }
    
    function animateParticles(): void {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach(particle => {
        if (ctx) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
          
          // Update position
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Boundary checking
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX = -particle.speedX;
          }
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.speedY = -particle.speedY;
          }
        }
      });
      
      // Connect nearby particles
      if (ctx) {
        particles.forEach((particle, i) => {
          for (let j = i + 1; j < particles.length; j++) {
            const otherParticle = particles[j];
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100 && ctx) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(74, 144, 226, ${0.2 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      }
      
      requestAnimationFrame(animateParticles);
    }
  </script>

  <div class={styles.container}>
    <section class={styles.hero}>
      <canvas class={styles.heroCanvas} bind:this={canvas}></canvas>
      <div class={styles.heroContent}>
        <h1 class={styles.heroTitle}>Building <span class={styles.typewriter}>Digital Solutions</span></h1>
        <p class={styles.heroSubtitle}>A collection of my technical projects and software engineering work</p>
        <div>
          <span class={styles.techBadge}>Web Development</span>
          <span class={styles.techBadge}>UI/UX Design</span>
          <span class={styles.techBadge}>Frontend</span>
          <span class={styles.techBadge}>Backend</span>
          <span class={styles.techBadge}>DevOps</span>
        </div>
      </div>
    </section>
  
    <section class={styles.projectsSection}>
      <h2 class={styles.sectionTitle}>Featured Projects</h2>
      <p class={styles.sectionSubtitle}>Explore my latest work and technical expertise</p>
      
      <div class={styles.projectsGrid}>
        {#each projects as project}
          <div class={styles.projectCard}>
            <div class={styles.projectCmageContainer}>
              <Image
                src={project.image} 
                alt={project.title} 
                class={styles.projectImage}
                breakpoints={[400, 800, 1200]}
                sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px" 
              />
            </div>
            <div class={styles.projectContent}>
              <h2 class={styles.projectTitle}>{project.title}</h2>
              <p class={styles.projectDescription}>{project.description}</p>
              <div class={styles.tags}>
                {#each project.tags as tag}
                  <span class={styles.tag}>{tag}</span>
                {/each}
              </div>
              <a href="/project/{project.link}" class={styles.projectLink}>
                View Project 
                <span class={styles.arrowIcon}>→</span>
              </a>
            </div>
          </div>
        {/each}
      </div>
    </section>
  </div>
