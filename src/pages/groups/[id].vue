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
            <button v-if="isGroupOwner()" @click="deleteGroup($route.params.id); $router.push('/groups')">
                delete group
            </button>
            <button v-else @click="leaveGroup($route.params.id); $router.push('/groups')">
                leave group
            </button>
            <pre>Partecipants: {{ currentGroup.partecipants }}</pre>

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

            <RouterLink to="/users">
                Invite someone
            </RouterLink>
        </div>

        <ChoreCycle :chores="currentGroup.chores" :partecipants="currentGroup.partecipants" />
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const { user } = useUser();
    const { getGroup, deleteGroup } = useGroup();
    const { deleteChore } = useChore();
    const currentGroup = ref<Group>();

    const refreshGroup = async() => {
        currentGroup.value = await getGroup(route.params.id.toString());
    };

    const isGroupOwner = () => {
        return currentGroup.value?.partecipants.find((partecipant: Partecipant) => (partecipant.user.id === user.value.user?.uid) && partecipant.owner);
    };

    await refreshGroup();
</script>
