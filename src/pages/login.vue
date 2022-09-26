<template>
    <div container mt-20>
        <h1 font-bold font-heading text-4xl>
            Login page
        </h1>

        <div flex space-x-5 mt-10>
            <button v-if="signedIn" @click="logout()">
                Logout
            </button>
            <button v-else @click="login()">
                Login
            </button>
        </div>
    </div>

    <div v-if="signedIn">
        <div mt-10>
            <Invites />
        </div>

        <div mt-10>
            <MyGroups />
        </div>
    </div>
</template>

<script lang="ts" setup>
    const { signedIn, login, logout } = useUser();
</script>
