<template>
    <div container>
        My groups:

        <pre>{{ groups }}</pre>
    </div>
</template>

<script lang="ts" setup>
    const { user } = useUser();
    const { getUserGroups } = useGroup();
    const groups = ref<Group[]>([]);

    groups.value = await getUserGroups(user.value?.uid);
</script>
