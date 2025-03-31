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
                <span class="date">March 22, 2025</span>
                <span class="author">By Tech Explorer</span>
                <span class="category">Innovation</span>
            </div>
            
            <div class={styles.postContent}>
                <enhanced:img 
                    src="../../../lib/img/ai-generated-girl.webp" 
                    alt="Abstract AI-generated artwork with swirling colors" 
                    class={styles.floatImage}
                />
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porta malesuada eros, eget luctus ipsum. Nam et sem id nulla fringilla dapibus. Nullam ultrices nisl risus, in viverra libero egestas sit amet.</p>
                
                <p>Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.</p>
                
                <p>Proin laoreet, ligula non elementum gravida, felis elit accumsan urna, nec pharetra quam eros non neque. Nulla mattis aliquet justo, a tincidunt nibh fermentum vel. Vestibulum at eros lorem. Vestibulum vel odio bibendum, elementum nisl et, mattis urna.</p>
                
                <p>Mauris eleifend nulla eget enim efficitur, vel ultricies orci euismod. Fusce posuere feugiat dignissim. In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent in sagittis nisl. Nullam semper leo et erat pellentesque ultrices.</p>
                
                <p>Maecenas ut libero tincidunt, pellentesque elit vel, lacinia tortor. Integer semper vestibulum bibendum. Cras purus tortor, eleifend eget eros eget, molestie luctus arcu. Cras commodo neque vel eros consectetur ultricies. Duis vitae magna ac urna scelerisque faucibus. Duis euismod augue vel sagittis accumsan.</p>
                
                <p>Praesent augue urna, facilisis ac dapibus vel, commodo et lacus. Aenean in fermentum metus. Cras sed auctor sem. Nullam lobortis magna quis consequat ultrices. Donec consectetur lobortis sapien, at interdum sapien ornare in. Aenean a arcu ullamcorper, porta lorem eget, dignissim magna.</p>
            </div>
        </article>
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