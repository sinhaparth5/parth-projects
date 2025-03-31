<script lang="ts">
    import katex from "katex";
    import "katex/dist/katex.min.css";
    
    export let equation = '';
    export let displayMode = false;
    
    let mathElement: HTMLElement;
    
    $: if (mathElement && equation) {
        katex.render(equation, mathElement, {
            displayMode: displayMode,
            throwOnError: false
        });
    }
</script>

<span bind:this={mathElement}></span>