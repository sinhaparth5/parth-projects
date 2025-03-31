<script lang="ts">
    import BackgroundBoxes from '../../../components/boxes.svelte';
    import styles from '../../../lib/css/components.module.css';
    import Sidebar from '../../../components/Sidebar.svelte';
    import HamburgerMenu from '../../../components/HamburgerMenu.svelte';
    import { onMount } from 'svelte';

    // Mobile menu state
    let isMobileMenuOpen = false;
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }
    
    // Close mobile menu 
    function closeMobileMenu() {
        isMobileMenuOpen = false;
    }
    
    // Close mobile menu when clicking outside
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as Element;
        if (isMobileMenuOpen && 
            !target.closest('.sidebar') && 
            !target.closest('.hamburger-menu')) {
            isMobileMenuOpen = false;
        }
    }
    
    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
</script>
<div class="layout" class:menu-open={isMobileMenuOpen}>
    <!-- Hamburger menu button (mobile only) -->
    <HamburgerMenu isOpen={isMobileMenuOpen} on:click={toggleMobileMenu} />
    
    <!-- Overlay for mobile menu -->
    {#if isMobileMenuOpen}
        <button class="mobile-overlay" aria-label="Hamburger navigation" on:click={closeMobileMenu}></button>
    {/if}
    
    <!-- Sidebar component -->
    <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        on:closemenu={closeMobileMenu} 
    />
    <main>
        <BackgroundBoxes />
            <article class={styles.blogPost}>
                <h1>The Future of Technology</h1>
                
                <div class={styles.postMeta}>
                    <span class="date">March 27, 2025</span>
                    <span class="author">By Parth Sinha</span>
                    <span class="category">Innovation</span>
                </div>
                
                <div class={styles.postContent}>
                    <enhanced:img 
                        src="../../../lib/img/ai-generated-girl.webp" 
                        alt="Abstract AI-generated artwork with swirling colors" 
                        class={styles.floatImage}
                    />
                    
                    <section class="intro">
                        <p>MathSnap is a lightweight, framework-agnostic wrapper around KaTeX that simplifies rendering mathematical equations in web applications. It works seamlessly with React, Svelte, Vue, and vanilla JavaScript.</p>
                    </section>
                
                    <section class="features">
                        <h2>Features</h2>
                        <ul>
                            <li>🧮 Simplified API for LaTeX equation rendering</li>
                            <li>⚛️ Framework-specific components (React, Svelte, Vue)</li>
                            <li>📱 Responsive design by default</li>
                            <li>🎨 Flexible styling options</li>
                            <li>🔍 Built-in error handling</li>
                            <li>📦 Small bundle size with KaTeX as sole dependency</li>
                            <li>📝 TypeScript type definitions included</li>
                        </ul>
                    </section>

                    <section class="installation">
                        <h2>Installation</h2>
                        <p>Install MathSnap and KaTeX using your preferred package manager:</p>
                            <code>
                                # Using npm <br>
                                npm install mathsnap <br><br>
                            </code>
                            <code>
                                # Using pnpm <br>
                                pnpm add mathsnap <br><br>
                            </code>
                    </section>
    </main>
</div>
<style>
    .layout {
        position: relative;
        min-height: 100vh;
    }
    
    .main-content {
        width: 100%;
    }
    
    .mobile-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 90;
    }

    .menu-open .mobile-overlay {
        display: block;
    }

</style>