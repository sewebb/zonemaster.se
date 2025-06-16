<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { ResultLevel } from '@/lib/client.ts';

    type Props = {
<<<<<<< HEAD
        level?: ResultLevel | 'default';
        children?: Snippet;
        round?: boolean;
        border?: boolean;
        size?: 'small' | 'medium';
=======
        level: ResultLevel
        children?: Snippet;
        round?: boolean;
>>>>>>> 6ff2543 (add new code base)
    };

    let {
        children,
<<<<<<< HEAD
        level = 'default',
        round = false,
        size = 'medium',
        border = false,
    }: Props = $props();
</script>
<span class={['zm-badge', `zm-bg-${level.toLowerCase()}`, `zm-badge--${size}`, round ? 'zm-badge--round' : false, border ? 'zm-badge--border' : false]}>
=======
        level,
        round = false
    }: Props = $props();
</script>
<span class={['zm-badge', `zm-bg-${level.toLowerCase()}`, round ? 'zm-badge--round' : false]}>
>>>>>>> 6ff2543 (add new code base)
  {@render children?.()}
</span>
