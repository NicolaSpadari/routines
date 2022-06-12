<template>
    <nav fixed w-screen bottom-0 bg-white>
        <div container py-5>
            <div grid grid-cols-4 gap-4>
                <RouterLink to="/" text-center>
                    <i-heroicons-outline-home w-6 h-6 />
                </RouterLink>
                <RouterLink to="/users" text-center>
                    <i-heroicons-outline-users w-6 h-6 />
                </RouterLink>
                <RouterLink to="/groups" text-center>
                    <i-heroicons-outline-search w-6 h-6 />
                </RouterLink>
                <RouterLink to="/account" text-center>
                    <i-heroicons-outline-cog w-6 h-6 />
                </RouterLink>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
    .router-link-exact-active{
        @apply text-night;
    }
</style>
