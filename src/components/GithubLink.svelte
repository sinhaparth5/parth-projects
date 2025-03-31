<script lang="ts">
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    
    export let url: string;
    export let label: string = "github";
    
    let copied = false;
    let copyTimeout: ReturnType<typeof setTimeout>;
    
    function copyToClipboard() {
        navigator.clipboard.writeText(url).then(() => {
            copied = true;
            
            // Clear any existing timeout
            if (copyTimeout) clearTimeout(copyTimeout);
            
            // Reset the copied state after 2 seconds
            copyTimeout = setTimeout(() => {
                copied = false;
            }, 2000);
        });
    }
    
    // Clean up timeout on component destroy
    onMount(() => {
        return () => {
            if (copyTimeout) clearTimeout(copyTimeout);
        };
    });
</script>

<div class="github-link-container">
    <div class="terminal-header">
        <div class="terminal-buttons">
            <span class="terminal-button red"></span>
            <span class="terminal-button yellow"></span>
            <span class="terminal-button green"></span>
        </div>
        <div class="terminal-title">bash</div>
    </div>
    <div class="terminal-content">
        <pre><code><span class="prompt">$</span> <span class="command">{label}</span> = {url}</code></pre>
        <button 
            class="copy-button" 
            on:click={copyToClipboard} 
            aria-label="Copy to clipboard"
        >
            {#if copied}
                <span class="copy-icon" transition:fade={{ duration: 200 }}>✓</span>
            {:else}
                <span class="copy-icon" transition:fade={{ duration: 200 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </span>
            {/if}
        </button>
    </div>
</div>

<style>
    .github-link-container {
        border-radius: 6px;
        overflow: hidden;
        font-family: monospace;
        margin: 1.5rem 0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color: #1e1e1e;
        color: #f8f8f8;
    }
    
    .terminal-header {
        background-color: #2d2d2d;
        padding: 8px 16px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #444;
    }
    
    .terminal-buttons {
        display: flex;
        gap: 6px;
        margin-right: 12px;
    }
    
    .terminal-button {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }
    
    .red {
        background-color: #ff5f56;
    }
    
    .yellow {
        background-color: #ffbd2e;
    }
    
    .green {
        background-color: #27c93f;
    }
    
    .terminal-title {
        font-size: 0.8rem;
        color: #ccc;
    }
    
    .terminal-content {
        padding: 16px;
        position: relative;
    }
    
    pre {
        margin: 0;
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
        font-size: 14px;
        white-space: pre-wrap;
        word-break: break-all;
    }
    
    .prompt {
        color: #8ae234;
        margin-right: 8px;
    }
    
    .command {
        color: #729fcf;
    }
    
    .copy-button {
        position: absolute;
        top: 12px;
        right: 12px;
        background: transparent;
        border: none;
        color: #ccc;
        cursor: pointer;
        border-radius: 4px;
        padding: 4px 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s, color 0.2s;
    }
    
    .copy-button:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
    }
    
    .copy-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
</style>