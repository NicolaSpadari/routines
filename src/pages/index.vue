<template>
    <div container mt-20>
        <pre v-if="signedIn">User is {{ user }}</pre>
        <p v-else>
            Not logged in
        </p>
    </div>
</template>

<script lang="ts" setup>
    useHead({
        title: "Home",
        meta: [
            {
                name: "description",
                content: "Homepage description"
            }
        ]
    });

    const { user, signedIn } = useUser();
</script>
