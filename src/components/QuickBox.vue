<template>
    <RouterLink
        :to="props.to"
        aspect-1 flex flex-col items-start p-5 border border-gray-100 shadow-sm rounded-xl focus="outline-none ring" hover="border-gray-200 ring-1 ring-gray-200"
    >
        <div p-3 rounded-lg bg-gray-50>
            <span :class="props.icon" w-6 h-6 />
        </div>

        <p font-bold mt-2>
            <slot />
        </p>

        <p v-if="props.desc" hidden sm="mt-1 text-sm text-gray-600 block">
            {{ props.desc }}
        </p>
    </RouterLink>
</template>

<script lang="ts" setup>
    const props = defineProps({
        to: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: false
        }
    });
</script>
