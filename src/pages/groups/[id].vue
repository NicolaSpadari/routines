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
            <button @click="deleteGroup($route.params.id); $router.push('/groups')">
                delete group
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

        <!-- <ChoreCycle :chores="currentGroup.chores" :partecipants="currentGroup.partecipants" /> -->

        <div flex mt-10 space-x-5>
            <div v-for="(partecipant, index) in currentGroup.partecipants" :key="partecipant.user.id">
                <p mb-5>
                    {{ partecipant.user.name }}
                </p>
                <p v-for="chore in getShiftedChores(currentGroup.chores, index)" :key="`${partecipant.user.id}-${chore.name}`">
                    {{ chore.name }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const { getGroup, deleteGroup } = useGroup();
    const { deleteChore } = useChore();
    const currentGroup = ref<Group>();

    const refreshGroup = async() => {
        currentGroup.value = await getGroup(route.params.id.toString());
    };

    const getShiftedChores = (chores: Chore[], num: number) => {
        const i = chores.length - num;
        return chores.slice(i).concat(chores.slice(0, i));
    };

    await refreshGroup();
</script>
