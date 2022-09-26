<template>
    <div w-screen>
        <div crate-xs pt-7>
            <div flex justify-between items-center>
                <button i-heroicons-outline-menu-alt-2 w-7 h-7 text-broncos />

                <img v-if="signedIn" :src="user.photoURL" w-12 h-12 rounded-full shadow-lg>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const { signedIn, user } = useUser();
</script>
