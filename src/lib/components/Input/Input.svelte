<script lang="ts">
    type Props = {
        type?: string;
        size?: 'small' | 'large';
        name: string;
        value?: string;
        placeholder?: string;
        label?: string;
        id?: string;
        disabled?: boolean;
        onInput?: (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => void;
        class?: string;
<<<<<<< HEAD
        matchContentWidth?: boolean;
=======
>>>>>>> 6ff2543 (add new code base)
        [x: string]: unknown;
    };

    let {
        type = 'text',
        size = 'large',
        value = $bindable(),
        name,
        placeholder,
        label,
        disabled,
        id,
        onInput: onInputCb,
        class: className = '',
<<<<<<< HEAD
        matchContentWidth = false,
        error: defaultError = null,
        ...restProps
    }: Props = $props();

    let inputWidth = $state(0);
    let error = $state(defaultError);

    function onInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
        error = false;
        onInputCb?.(event);
    }

    $effect(() => {
        error = defaultError;

        if (matchContentWidth) {
            const mirror = document.createElement('span');

            mirror.style.visibility = 'hidden';
            mirror.style.whiteSpace = 'pre';
            mirror.style.position = 'absolute';
            mirror.style.width = 'auto';
            mirror.className = `zm-input zm-input--${size}`;
            mirror.textContent = value || placeholder || '';

            document.body.appendChild(mirror);

            setTimeout(() => {
                inputWidth = mirror.offsetWidth;
                document.body.removeChild(mirror);
            }, 0);
        }
    });
=======
        ...restProps
    }: Props = $props();
>>>>>>> 6ff2543 (add new code base)
</script>

{#if label}
    <label for={id} class="zm-label">{label}</label>
{/if}
<input name={name} id={id} bind:value={value} type={type} class={['zm-input', `zm-input--${size}`, className]} disabled={disabled}
<<<<<<< HEAD
       placeholder={placeholder} oninput={onInput} style="min-width: {inputWidth}px" {...restProps} />
=======
       placeholder={placeholder} oninput={onInput} {...restProps} />
>>>>>>> 6ff2543 (add new code base)
