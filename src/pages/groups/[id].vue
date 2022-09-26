<route>
{
    meta: {
        requiresAuth: true
    }
}
</route>

<template>
    <div mt-5>
        <div v-if="currentGroup" crate>
            <div flex space-x-7>
                <div>
                    <p text-3xl font-bold tracking-tight font-broncos>
                        {{ currentGroup.name }}
                    </p>
                    <p text-xs text-gray-500 ml-5>
                        {{ currentGroup.partecipants.length }} members
                    </p>
                </div>

                <div flex space-x--2>
                    <img v-for="person in currentGroup.partecipants" :key="person.user.id" :src="person.user.picture" inline-block h-10 w-10 rounded-full ring-2 ring-white>
                </div>
            </div>

            <ChoreCycle :chores="currentGroup.chores" :partecipants="currentGroup.partecipants" @completed="completeChore" />
        </div>

        <div crate space-y-5 mt-5>
            <NewChore v-if="$route.params.id" :group-id="$route.params.id" @added="refreshGroup()" />

            <div flex justify-center>
                <div flex items-center space-x-5>
                    <RouterLink
                        v-if="isGroupOwner(currentGroup, user.uid)"
                        to="/users"
                        w-14 h-14 flex justify-center items-center p-4 text-green-700 bg-green-100 rounded-full
                    >
                        <i-heroicons-outline-user-plus w-4 h-4 />
                    </RouterLink>

                    <button
                        v-if="isGroupOwner(currentGroup, user.uid)"
                        w-14 h-14 flex justify-center items-center p-4 text-red-700 bg-red-100 rounded-full
                        type="button"
                        @click="deleteGroup($route.params.id); $router.push('/groups')"
                    >
                        <i-heroicons-outline-trash w-4 h-4 />
                    </button>

                    <button
                        v-else
                        w-14 h-14 flex justify-center items-center p-4 text-red-700 bg-red-100 rounded-full
                        type="button"
                        @click="leaveGroup($route.params.id); $router.push('/groups')"
                    >
                        <i-heroicons-outline-user-minus w-4 h-4 />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const { user } = useUser();
    const { getGroup, deleteGroup, isGroupOwner } = useGroup();
    const { addChore, deleteChore } = useChore();
    const { sendMessage } = useMessage();
    const currentGroup = ref<Group | null>(null);

    const refreshGroup = async () => {
        currentGroup.value = await getGroup(route.params.id.toString());
    };

    const completeChore = async (chore: Chore) => {
        const prevChore = chore;
        prevChore.completed = chore.completed.filter((id: string) => id !== user.value!.uid);
        await deleteChore(route.params.id.toString(), prevChore, false);
        currentGroup.value!.chores.find((c: Chore) => c.name === chore.name)!.completed.push(user.value!.uid);
        await addChore(route.params.id.toString(), currentGroup.value!.chores.find((c: Chore) => c.name === chore.name), false);

        sendMessage(`${user.value?.displayName} completed ${chore.name}`);
    };

    await refreshGroup();
</script>
