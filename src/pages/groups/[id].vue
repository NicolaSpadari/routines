<route>
{
    meta: {
        requiresAuth: true
    }
}
</route>

<template>
    <div v-if="currentGroup" container mt-20>
        <h1 font-bold font-heading text-4xl>
            Group {{ currentGroup.name }}
        </h1>

        <div space-y-5 mt-10>
            <pre>Partecipants: {{ groupPartecipants }}</pre>

            <p>Chores:</p>
            <ul>
                <li v-for="chore in currentGroup.chores" :key="chore.name">
                    {{ chore.name }} <button class="text-xs" @click="removeChore(chore)">
                        (delete)
                    </button>
                </li>
            </ul>
        </div>

        <div flex flex-col space-y-5 mt-10>
            <NewChore :group-id="$route.params.id" />

            <Invite :group-id="$route.params.id" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type { QueryConstraint } from "@firebase/firestore";

    const route = useRoute();
    const { getGroup } = useGroup();
    const currentGroup = await getGroup(route.params.id.toString());
    const queryConstraints = ref<QueryConstraint[]>([]);
    const groupPartecipants = ref<User[]>([]);

    currentGroup?.partecipants.forEach((partecipant: string) => {
        queryConstraints.value.push(where("id", "==", partecipant));
    });

    const querySnapshot = await getDocs(query(collection(db, "users"), ...queryConstraints.value));
    querySnapshot.forEach((doc) => {
        groupPartecipants.value.push(doc.data() as User);
    });

    const removeChore = async(chore: Chore) => {
        try {
            await updateDoc(doc(db, "groups", route.params.id.toString()), {
                chores: arrayRemove(chore)
            });
            console.log("removed");
        } catch (err) {
            console.error("Error removing chore:", err);
        }
    };
</script>
