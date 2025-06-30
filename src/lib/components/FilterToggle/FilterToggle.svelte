<script lang="ts">
<<<<<<< HEAD
    type Props = {
        value?: string;
        label: string;
        badge?: number;
        icon?: string;
        name: string;
        checked: boolean;
        severity?: 'all' | 'info' | 'notice' | 'warning' | 'error' | 'critical';
        onCheck?: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
    };

    let {
        badge,
        label,
        value,
        icon,
        severity = 'all',
        checked = $bindable(false),
        onCheck = () => {},
    }: Props = $props();
</script>
<label class={['zm-filter-toggle', { ['zm-is-active']: checked }, `zm--${severity}`]}>
    <input type="checkbox" bind:checked={checked} onchange={onCheck} value={value} />
    {label}
    {#if badge !== undefined}
=======
  type Props = {
    value?: string;
    label: string;
    badge?: number;
<<<<<<< HEAD
    icon?: string;
=======
>>>>>>> 6ff2543 (add new code base)
    name: string;
    checked: boolean;
    severity?: 'all' | 'info' | 'notice' | 'warning' | 'error' | 'critical';
    onCheck?: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
  };

  let {
    badge,
    label,
    value,
<<<<<<< HEAD
    icon,
=======
>>>>>>> 6ff2543 (add new code base)
    severity = 'all',
    checked = $bindable(false),
    onCheck = () => {},
  }: Props = $props();
</script>
<label class={['zm-filter-toggle', { ['zm-is-active']: checked }, `zm--${severity}`]}>
  <input type="checkbox" bind:checked={checked} onchange={onCheck} value={value} />
  {label}
  {#if badge !== undefined}
<<<<<<< HEAD
>>>>>>> 4a16f44 (add new code base)
    <span class="zm-filter-toggle__badge">
        {#if icon}
          <i class={`bi bi-${icon}`}></i>
        {/if}
        {badge}
    </span>
<<<<<<< HEAD
    {/if}
=======
=======
    <span class="zm-filter-toggle__badge">{badge}</span>
>>>>>>> 6ff2543 (add new code base)
  {/if}
>>>>>>> 4a16f44 (add new code base)
</label>
