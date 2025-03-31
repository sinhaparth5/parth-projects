<script lang="ts">
    export let isOpen = false;
</script>

<button class="hamburger-menu" class:open={isOpen} on:click aria-label="Menu">
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
</button>

<style>
    .hamburger-menu {
        display: flex; /* Always show, not just on mobile */
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 200;
        background: none;
        border: none;
        cursor: pointer;
        padding: 10px;
        width: 44px;
        height: 44px;
        flex-direction: column;
        justify-content: space-between;
        background-color: rgba(25, 25, 30, 0.8);
        border-radius: 4px;
    }
    
    .hamburger-line {
        display: block;
        width: 24px;
        height: 3px;
        background-color: white;
        transition: transform 0.3s, opacity 0.3s;
    }
    
    .open .hamburger-line:nth-child(1) {
        transform: translateY(10px) rotate(45deg);
    }
    
    .open .hamburger-line:nth-child(2) {
        opacity: 0;
    }
    
    .open .hamburger-line:nth-child(3) {
        transform: translateY(-10px) rotate(-45deg);
    }
</style>