<template>
    <div>
        <button @click="createGroup()">
            Create Group
        </button>
    </div>
</template>

<script lang="ts" setup>
    const { group, createGroup, deleteGroup } = useGroup();
</script>
