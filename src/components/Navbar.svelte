<script lang="ts">
    import { page } from '$app/stores';
    import styles from '../lib/css/Navbar.module.css';
    
    export let session: any = null;
    
    // Get user from session if it exists
    $: user = session?.user || null;
    
    // Determine if we're on the home page
    $: isHomePage = $page.url.pathname === '/';
    
    // Only show navbar if we're not on the home page
    $: showNavbar = !isHomePage;
  </script>
  
  {#if showNavbar}
    <nav class={styles.navbar}>
      <div class={styles.container}>
        <a href="/" class={styles.logo}>
          <span class={styles.logoText}>P4rth<span class={styles.accent}>Project</span></span>
        </a>
        
        <div class={styles.links}>
          <a href="/projects" class={styles.link}>Projects</a>
          <a href="/about" class={styles.link}>About</a>
          
          {#if user}
            <div class={styles.userSection}>
              <a href="/projects/create" class={styles.createBtn}>Create Project</a>
              <div class={styles.userMenu}>
                <span class={styles.username}>{user.user_metadata?.username || user.email}</span>
                <form method="POST" action="/logout">
                  <button type="submit" class={styles.logoutBtn}>Logout</button>
                </form>
              </div>
            </div>
          {:else}
            <div class={styles.authButtons}>
              <a href="/auth/login" class={styles.loginBtn}>Login</a>
              <a href="/auth/register" class={styles.registerBtn}>Register</a>
            </div>
          {/if}
        </div>
      </div>
    </nav>
  {/if}