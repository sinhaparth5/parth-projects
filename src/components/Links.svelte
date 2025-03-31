<script>
    import styles from "../lib/css/Link.module.css"
    export let url = '';
    
    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy link');
        }
    }
</script>

<div class={styles.linkContainer}>
    <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
    <button on:click={copyToClipboard}>Copy</button>
</div>