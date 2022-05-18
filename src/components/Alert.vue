<template>
    <div
        v-if="visible"
        class="fixed bottom-16 right-16 flex items-center justify-between p-4 border rounded min-w-sm text-red-700 border-red-900/10 bg-red-50"
        role="alert"
    >
        <p class="text-sm font-bold">
            {{ message }}
        </p>

        <button class="opacity-90" type="button" @click="closeAlert()">
            <span class="sr-only"> Close </span>
            <div class="i-heroicons-outline-x w-4 h-4" />
        </button>
    </div>
</template>

<script lang="ts" setup>
    const { visible, message, closeAlert } = useAlert();
</script>
