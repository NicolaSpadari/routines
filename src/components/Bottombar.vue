<template>
    <nav fixed w-screen bottom-0 bg-white>
        <div crate py-5>
            <div grid grid-cols-3 gap-4>
                <RouterLink to="/" text-center text-dark-800>
                    <i-heroicons-outline-home w-6 h-6 />
                </RouterLink>
                <RouterLink to="/users" text-center text-dark-800>
                    <i-heroicons-outline-search w-6 h-6 />
                </RouterLink>
                <button type="button" @click="logout()" text-center text-dark-800>
                    <i-heroicons-outline-arrow-right-on-rectangle w-6 h-6 />
                </button>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>
    const { logout } = useUser();
</script>

<style lang="scss" scoped>
    .router-link-exact-active{
        @apply text-night;
    }
</style>
