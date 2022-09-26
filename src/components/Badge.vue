<template>
    <button :class="props.active ? 'text-white bg-night font-semibold border-night shadow-md' : 'text-night border-light bg-light'" whitespace-nowrap border px-5 py-2 rounded-full text-sm tracking-wide>
        <slot />
    </button>
</template>

<script lang="ts" setup>
    const props = defineProps({
        active: {
            type: Boolean,
            default: false
        }
    });
</script>
