<route>
{
    meta: {
        requiresAuth: true
    }
}
</route>

<template>
    <div container px-5 mt-10>
        <h1 font-bold font-heading text-4xl>
            Your groups
        </h1>

        <div space-y-15 mt-10>
            <div relative max-w-sm mx-auto>
                <label class="sr-only" for="groupName"> Group Name </label>

                <input
                    id="groupName"
                    w-full py-4 pl-3 pr-16 text-sm border-2 border-gray-200 rounded-lg
                    type="text"
                    placeholder="Group name"
                    v-model="groupData.name"
                >

                <button :disabled="groupData.name === ''" @click="checkOrCreateGroup()" absolute text-white translate-y="-1/2" bg-blue-600 rounded-full top="1/2" right-4 w-10 h-10>
                    <i-heroicons-solid-arrow-right w-4 h-4 />
                </button>
            </div>

            <div flex items-center justify-center space-x-5>
                <span w-20 border-b border-gray-300 />

                <p text-xs text-center text-gray-500 uppercase>
                    or browse
                </p>

                <span w-20 border-b border-gray-300 />
            </div>

            <div grid lg="grid-cols-2 gap-4">
                <RouterLink v-for="group in groups" :key="group.id" :to="`/groups/${group.id}`" block p-8 bg-gray-900 border border-gray-800 shadow-xl rounded-xl>
                    <p text-xl font-bold text-white>
                        {{ group.name }}
                    </p>

                    <div flex items-center mt-4>
                        <div flex space-x--2>
                            <template v-if="group.partecipants.length > maxPartecipants">
                                <img v-for="i in maxPartecipants" :key="group.partecipants[i].user.id" :src="group.partecipants[i].user.picture" inline-block h-10 w-10 rounded-full ring-2 ring-white>
                                <div inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gray-300 flex items-center justify-center>
                                    <p text-dark-800 text-xs>
                                        + {{ group.partecipants.length - maxPartecipants }}
                                    </p>
                                </div>
                            </template>
                            <template v-else>
                                <img v-for="person in group.partecipants" :key="person.user.id" :src="person.user.picture" inline-block h-10 w-10 rounded-full ring-2 ring-white>
                            </template>
                        </div>
                    </div>

                    <p class="mt-4 text-sm text-gray-300">
                        Owner: {{ group.partecipants.find(p => p.owner).user.name }} &middot; {{ group.chores.length }} chores
                    </p>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const { createGroup, getAllGroups, getUserGroups, getGroup } = useGroup();
    const { user } = useUser();
    const { showAlert } = useAlert();
    const groups = ref<Group[]>([]);
    const groupData = reactive<Group>({
        id: uuidV4(),
        name: "",
        partecipants: [],
        chores: []
    });
    const maxPartecipants = ref(4);

    const checkOrCreateGroup = async () => {
        const exists = await getGroup(groupData.name);

        if (!exists) {
            groupData.partecipants.push({
                user: {
                    id: user.value.user.uid,
                    name: user.value.user.displayName,
                    email: user.value.user.email,
                    picture: user.value.user.photoURL
                },
                owner: true
            });
            await createGroup(groupData);
            groups.value = await getUserGroups(user.value.user.uid);
        } else {
            showAlert("Group already exists");
        }
    };

    groups.value = await getAllGroups();
</script>
