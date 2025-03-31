<!-- src/lib/components/Footer.svelte -->
<script lang="ts">
    import styles from '../lib/css/Footer.module.css';
    
    const currentYear = new Date().getFullYear();
  </script>
  
  <footer class={styles.footer}>
    <div class={styles.container}>
      <div class={styles.content}>
        <div class={styles.brand}>
          <a href="/" class={styles.logo}>
            <span class={styles.logoText}>P4rth<span class={styles.accent}>Project</span></span>
          </a>
          <p class={styles.tagline}>Create, showcase, and discover amazing projects.</p>
        </div>
        
        <div class={styles.links}>
          <div class={styles.linkGroup}>
            <h3 class={styles.linkTitle}>Navigation</h3>
            <ul class={styles.linkList}>
              <li><a href="/" class={styles.link}>Home</a></li>
              <li><a href="/projects" class={styles.link}>Projects</a></li>
              <li><a href="/about" class={styles.link}>About</a></li>
            </ul>
          </div>
          
          <div class={styles.linkGroup}>
            <h3 class={styles.linkTitle}>Account</h3>
            <ul class={styles.linkList}>
              <li><a href="/login" class={styles.link}>Login</a></li>
              <li><a href="/auth/register" class={styles.link}>Register</a></li>
              <li><a href="/projects/create" class={styles.link}>Create Project</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class={styles.bottom}>
        <p class={styles.copyright}>&copy; {currentYear} P4rthProject. All rights reserved.</p>
        <div class={styles.social}>
          <a href="https://github.com/sinhaparth5" class={styles.socialLink} aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://x.com/sinhaparth555" class={styles.socialLink} aria-label="X">
            <!-- X logo (official version) -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1200 1227" fill="currentColor">
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/parth-sinha18/" class={styles.socialLink} aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>