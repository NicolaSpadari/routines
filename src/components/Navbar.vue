<template>
    <nav class="navbar" fixed w-screen bottom-0 bg-gray-100>
        <div container py-3>
            <div grid grid-cols-4 gap-4>
                <RouterLink to="/" text-center>
                    <i-heroicons-solid-home w-5 h-5 text-dark-800 />
                </RouterLink>
                <RouterLink to="/users" text-center>
                    <i-heroicons-solid-users w-5 h-5 text-dark-800 />
                </RouterLink>
                <RouterLink to="/groups" text-center>
                    <i-heroicons-solid-search w-5 h-5 text-dark-800 />
                </RouterLink>
                <RouterLink to="/account" text-center>
                    <i-heroicons-solid-cog w-5 h-5 text-dark-800 />
                </RouterLink>
            </div>
        </div>
    </nav>
</template>
