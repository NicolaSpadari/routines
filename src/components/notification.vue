<template>
    <div>
        <button @click="show()">
            show notification
        </button>
    </div>
</template>

<script lang="ts" setup>
    const { show } = useWebNotification({
        title: "Test notification",
        dir: "auto",
        lang: "it",
        renotify: true,
        tag: "test"
    });
</script>
