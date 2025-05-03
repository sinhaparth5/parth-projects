<script lang="ts">
    import { invalidate } from '$app/navigation';
    import Navbar from '../components/Navbar.svelte';
    import Footer from '../components/Footer.svelte';
    import '../lib/css/global.css';
    
    export let data;
  </script>
  
  <div class="app">
    <main>
      <slot />
    </main>
    <Footer />
  </div>