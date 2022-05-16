<template>
    <div container>
        My groups:

        <pre>{{ groups }}</pre>
    </div>
</template>

<script lang="ts" setup>
    const { user } = useUser();
    const groups = ref<Group[]>([]);

    const getGroups = async() => {
        try {
            const querySnapshot = await getDocs(query(collection(db, "groups"), where("partecipants", "array-contains", { id: user.value.user?.uid, owner: true || false })));
            querySnapshot.forEach((doc) => {
                groups.value.push(doc.data() as Group);
            });
        } catch (err) {
            console.error("Can't get groups: ", err);
        }
    };

    getGroups();
</script>
