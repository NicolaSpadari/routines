<template>
    <div container mt-20>
        <Test />

        <Notification />
    </div>
</template>

<script lang="ts" setup>
    useHead({
        title: "Home",
        meta: [
            {
                name: "description",
                content: "Homepage description"
            }
        ]
    });
</script>
