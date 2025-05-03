<script lang="ts">
    import { page } from '$app/stores';
    import { onMount, createEventDispatcher } from 'svelte';
    import styles from '../lib/css/Sidebar.module.css';
    
    // Props
    export let isMobileMenuOpen = false;
    
    // Project links (you can pass this as a prop instead if needed)
    export let projects = [
        { id: 1, name: "WCAG Scanner", slug: "wcag-scanner" },
        { id: 2, name: "Hidden Markov Models ", slug: "hmm" },
        { id: 3, name: "MathSnap", slug: "mathsnap" },
        { id: 4, name: "Task Management Tool", slug: "task-management" }
    ];
    
    // Event dispatcher to communicate with parent
    const dispatch = createEventDispatcher();
    
    // Close mobile menu when clicking a link
    function handleLinkClick() {
        dispatch('closemenu');
    }
</script>

<aside class="sidebar" class:open={isMobileMenuOpen}>
    <nav class={styles.navMainSection}>
        <div class={styles.navSection}>
            <a 
                href="/" 
                class="{styles.navLink} {styles.homeLink} {$page.url.pathname === '/' ? styles.active : ''}"
                on:click={handleLinkClick}
            >
                Home
            </a>
        </div>
        
        <div class={styles.navSection}>
            <h3>Projects</h3>
            <ul class={styles.projectsList}>
                {#each projects as project}
                    <li>
                        <a 
                            href="/project/{project.slug}" 
                            class="{styles.navLink} {$page.url.pathname === `/project/${project.slug}` ? styles.active : ''}"
                            on:click={handleLinkClick}
                        >
                            {project.name}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </nav>
</aside>

<style>
    .sidebar {
        width: 280px;
        background: linear-gradient(to bottom, #6B48FF, #FF8C00);
        color: #fff;
        padding: 2rem 0;
        position: fixed;
        height: 100vh;
        overflow-y: auto;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        z-index: 100;
        /* Start with sidebar hidden by default */
        left: -100%;
        transition: left 0.3s ease;
    }
    
    /* When open, show it */
    .sidebar.open {
        left: 0;
    }
</style>