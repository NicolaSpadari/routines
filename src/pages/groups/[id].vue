<route>
{
    meta: {
        requiresAuth: true
    }
}
</route>

<template>
    <div mt-5>
        <div v-if="currentGroup">
            <div flex justify-between items-center>
                <p text-3xl text-broncos sm="text-4xl">
                    Group <span font-bold>{{ currentGroup.name }}</span>
                </p>

                <button i-heroicons-outline-cog w-6 h-6 text-night @click="panelOpen = true" />
            </div>
        </div>

        <div space-y-3>
            <div flex space-x--2 mt-5>
                <img v-for="person in currentGroup.partecipants" :key="person.user.id" :src="person.user.picture" inline-block h-10 w-10 rounded-full ring-2 ring-white>
            </div>
            <p>{{ currentGroup.partecipants.length }} members</p>

            <div>
                <p>Chores:</p>
                <ul>
                    <li v-for="chore in currentGroup.chores" :key="chore.name">
                        {{ chore.name }} <button v-if="isGroupOwner(currentGroup, user.user.id)" class="text-xs" @click="deleteChore($route.params.id, chore); refreshGroup()">
                            (delete)
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <ChoreCycle :chores="currentGroup.chores" :partecipants="currentGroup.partecipants" @completed="completeChore" />

        <Panel :is-open="panelOpen" @close="panelOpen = false">
            <div m-5>
                <button v-if="isGroupOwner(currentGroup, user.user.id)" @click="deleteGroup($route.params.id); $router.push('/groups')">
                    delete group
                </button>
                <button v-else @click="leaveGroup($route.params.id); $router.push('/groups')">
                    leave group
                </button>

                <NewChore v-if="$route.params.id" :group-id="$route.params.id" @added="refreshGroup()" />

                <RouterLink to="/users">
                    Invite users
                </RouterLink>
            </div>
        </Panel>
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const { user } = useUser();
    const { getGroup, deleteGroup, isGroupOwner } = useGroup();
    const { addChore, deleteChore } = useChore();
    const { sendMessage } = useMessage();
    const currentGroup = ref<Group>();
    const panelOpen = ref(false);

    const refreshGroup = async () => {
        currentGroup.value = await getGroup(route.params.id.toString());
    };

    const completeChore = async (chore: Chore) => {
        const prevChore = chore;
        prevChore.completed = chore.completed.filter((id: string) => id !== user.value.user!.uid);
        await deleteChore(route.params.id.toString(), prevChore, false);
        currentGroup.value!.chores.find((c: Chore) => c.name === chore.name)!.completed.push(user.value.user!.uid);
        await addChore(route.params.id.toString(), currentGroup.value!.chores.find((c: Chore) => c.name === chore.name), false);

        sendMessage(`${user.value.user?.displayName} completed ${chore.name}`);
    };

    await refreshGroup();
</script>
