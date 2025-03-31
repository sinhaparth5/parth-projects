<script lang="ts">
    import styles from "../lib/css/components.module.css";
    import { onMount } from "svelte";
    import { spring } from 'svelte/motion';
    import type { Spring } from 'svelte/motion';

    interface Box {
        id: number;
        radius: string;
        color: string;
    }

    const colors: string[] = [
        '#FF10F0',
        '#39FF14',
        '#00DDE8',
        '#FFFF33'
    ];

    const boxes: Box[] = [
        { id: 1, radius: '49% 51% 70% 30% / 48% 40% 60% 52%', color: colors[0] },
        { id: 2, radius: '39% 61% 12% 88% / 48% 30% 70% 52%', color: colors[1] },
        { id: 3, radius: '58% 42% 57% 43% / 22% 60% 40% 78%', color: colors[2] },
        { id: 4, radius: '57% 43% 31% 69% / 70% 18% 82% 30%', color: colors[3] }
    ];
    
    // Create an array of position objects, each with x and y springs
    const positions = boxes.map(() => ({
        x: spring(0, { stiffness: 0.01, damping: 0.5 }),
        y: spring(0, { stiffness: 0.01, damping: 0.5 })
    }));

    // Create reactive variables to track positions
    let currentPositions = positions.map(() => ({ x: 0, y: 0 }));

    // Subscribe to all springs to update the currentPositions array
    positions.forEach((pos, index) => {
        pos.x.subscribe(value => {
            currentPositions[index].x = value;
        });
        
        pos.y.subscribe(value => {
            currentPositions[index].y = value;
        });
    });

    onMount(() => {
        const moveBoxes = (): void => {
            positions.forEach((pos) => {
                pos.x.set(Math.random() * (window.innerWidth - 150));
                pos.y.set(Math.random() * (window.innerHeight - 150));
            });
        };

        moveBoxes();
        const interval = setInterval(moveBoxes, 4000);

        return () => clearInterval(interval);
    });
</script>

<div class={styles.background}>
    {#each boxes as box, i}
        <div
            class={styles.box}
            style="
                border-radius: {box.radius};
                background-color: {box.color};
                transform: translate({currentPositions[i].x}px, {currentPositions[i].y}px);
            "
        ></div>
    {/each}
</div>