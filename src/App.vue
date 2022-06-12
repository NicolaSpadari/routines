<template>
    <Alert />

    <router-view v-slot="{ Component }">
        <Suspense>
            <component :is="Component" crate-xs />
        </Suspense>
    </router-view>

    <Bottombar />
</template>

<script lang="ts" setup>
    const router = useRouter();
    const { signedIn } = useUser();

    router.beforeEach(async (to, _, next) => {
        if (to.meta.requiresAuth && !signedIn.value) {
            next("/login");
        } else {
            next();
        }
    });
</script>

<style lang="scss">
    html {
        -webkit-tap-highlight-color: transparent;
        scroll-behavior: smooth;
    }
    body {
        @apply overflow-x-hidden font-sans;
    }
    img {
        -webkit-user-drag: none;
        @apply select-none;
    }
    .container, [container]{
        @apply mx-auto;
    }
    button[disabled]{
        @apply opacity-60 cursor-not-allowed;
    }

    // Transitions
    .fade-enter-active,
    .fade-leave-active {
        @apply transition-opacity ease-in-out duration-500;
    }
    .fade-enter-from,
    .fade-leave-to {
        @apply opacity-0;
    }

    .slide-enter-active,
    .slide-leave-active{
        @apply transition-transform ease-in-out duration-500;
    }
    .slide-enter-from,
    .slide-leave-to{
        @apply translate-y-full;
    }
</style>
