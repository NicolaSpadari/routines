<template>
    <div container mt-20>
        <button @click="showAlert('my msg')">
            show alert
        </button>
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
    const { showAlert } = useAlert();
</script>
