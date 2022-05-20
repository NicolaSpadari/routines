<template>
    <div container mt-20>
        <button v-if="isSupported" @click="show()">
            Show
        </button>

        <p v-else>
            Not supported
        </p>
    </div>
</template>

<script lang="ts" setup>
    const { isSupported, show } = useWebNotification({
        title: "test",
        dir: "auto",
        tag: "test"
    });
</script>
