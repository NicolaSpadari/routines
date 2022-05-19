<template>
    <Alert />

    <Navbar />
    <router-view v-slot="{ Component }">
        <Suspense>
            <component :is="Component" />
        </Suspense>
    </router-view>
</template>

<script lang="ts" setup>
    const router = useRouter();
    const { signedIn } = useUser();

    router.beforeEach(async(to, _, next) => {
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
</style>
