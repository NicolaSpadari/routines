<template>
    <div
        v-if="visible"
        fixed bottom-16 right-16 flex items-center justify-between p-4 rounded min-w-sm text-red-700 border="red-900/10" bg-red-50
        role="alert"
    >
        <p text-sm font-bold>
            {{ message }}
        </p>

        <button opacity-90 type="button" @click="closeAlert()">
            <i-heroicons-outline-x w-4 h-4 />
        </button>
    </div>
</template>

<script lang="ts" setup>
    const { visible, message, closeAlert } = useAlert();
</script>
