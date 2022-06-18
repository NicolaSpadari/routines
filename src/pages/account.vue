<template>
    <div space-y-10 mt-5>
        <p text-3xl font-bold text-broncos sm="text-4xl">
            Settings
        </p>

        <Badge active @click="logout()">Logout</Badge>
    </div>
</template>

<script lang="ts" setup>
    const { logout } = useUser();
</script>
