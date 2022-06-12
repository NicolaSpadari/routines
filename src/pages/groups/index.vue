<route>
{
    meta: {
        requiresAuth: true
    }
}
</route>

<template>
    <div mt-5>
        <div flex justify-between items-center>
            <p text-3xl font-bold text-broncos sm="text-4xl">
                Groups
            </p>

            <Badge active @click="panelOpen = true">
                New +
            </Badge>
        </div>

        <div mt-10>
            <div flex items-center justify-center space-x-5>
                <span w-20 border-b border-gray-300 />

                <p text-xs text-center text-gray-500 uppercase>
                    Your groups
                </p>

                <span w-20 border-b border-gray-300 />
            </div>

            <div grid lg="grid-cols-2 gap-4" space-y-5 mt-5>
                <RouterLink v-for="group in groups" :key="group.id" :to="`/groups/${group.id}`" block p-8 bg-white shadow-xl rounded-xl>
                    <p text-xl font-bold text-broncos>
                        {{ group.name }} <span text-gray-400 text-base font-normal>&middot; {{ group.chores.length }} chores</span>
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

                    <p mt-4 text-sm text-gray-400>
                        Owner: {{ group.partecipants.find(p => p.owner).user.name }}
                    </p>
                </RouterLink>
            </div>
        </div>

        <Panel :is-open="panelOpen" @close="panelOpen = false">
            <div m-5>
                <label class="relative block p-3 border-2 border-gray-200 rounded-lg" for="name">
                    <input
                        id="name"
                        v-model="groupData.name" w-full px-0 py-2 text-sm
                        border-none
                        type="text"
                        placeholder="Group Name"
                    >
                </label>

                <div grid grid-cols-2 gap-8 mt-5>
                    <Badge active :disabled="groupData.name === ''" @click="checkOrCreateGroup()">
                        Create
                    </Badge>
                    <Badge @click="panelOpen = false">
                        Close
                    </Badge>
                </div>
            </div>
        </Panel>
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
    const panelOpen = ref(false);

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
