<template>
    <div>
        <button v-if="isSupported" @click="show()">
            test: show notification
        </button>
        <p v-else>
            notifications not supported on this device
        </p>
    </div>
</template>

<script lang="ts" setup>
    const { isSupported, show } = useWebNotification({
        title: "Test notification",
        dir: "auto",
        lang: "it",
        renotify: true,
        tag: "test"
    });
</script>
