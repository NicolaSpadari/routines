<template>
    <div>
        <div flex space-x-5>
            <button v-if="signedIn" @click="logout()">
                Logout
            </button>
            <button v-else @click="login()">
                Login
            </button>
        </div>

        <pre v-if="signedIn">{{ user }}</pre>
    </div>
</template>

<script lang="ts" setup>
    const { user, signedIn, login, logout } = useUser();
</script>
