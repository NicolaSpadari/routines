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
                    {{ chore.name }} <button class="text-xs" @click="deleteChore($route.params.id, chore); refreshGroup()">
                        (delete)
                    </button>
                </li>
            </ul>
        </div>

        <div flex flex-col space-y-5 mt-10>
            <NewChore v-if="$route.params.id" :group-id="$route.params.id" @added="refreshGroup()" />

            <Invite :group-id="$route.params.id" />
        </div>
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const { getGroup, getGroupPartecipants } = useGroup();
    const { deleteChore } = useChore();
    const currentGroup = ref<Group>();
    const groupPartecipants = ref<User[]>([]);

    const refreshGroup = async() => {
        currentGroup.value = await getGroup(route.params.id.toString());
    };

    await refreshGroup();

    groupPartecipants.value = await getGroupPartecipants(currentGroup.value);
</script>
