<template>
    <router-view v-slot="{ Component }">
        <Suspense>
            <component :is="Component" />
        </Suspense>
    </router-view>
</template>

<style lang="scss">
	html {
		-webkit-tap-highlight-color: transparent;
		scroll-behavior: smooth;
	}
    body {
        @apply overflow-x-hidden;
    }
	img {
		-webkit-user-drag: none;
		@apply select-none;
	}
</style>
