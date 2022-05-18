<template>
    <div
        v-show="visible"
        class="fixed bottom-16 right-16 flex items-center space-x-4 p-4 text-green-700 border rounded border-green-900/10 bg-green-50"
        role="alert"
    >
        <strong class="text-sm font-medium"> {{ message }} </strong>

        <button class="opacity-90" type="button" @click="closeAlert()">
            <span class="sr-only"> Close </span>
            <div class="i-heroicons-outline-x w-4 h-4" />
        </button>
    </div>
</template>

<script lang="ts" setup>
    const { visible, message, closeAlert } = useAlert();
</script>
