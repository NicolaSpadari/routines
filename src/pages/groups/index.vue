<route>
{
    meta: {
        requiresAuth: true
    }
}
</route>

<template>
    <div container mt-20>
        <h1 font-bold font-heading text-4xl>
            Groups
        </h1>

        <div space-y-5 mt-10>
            <div space-x-5>
                <input v-model="groupData.name" type="text" placeholder="Group name">
                <button :disabled="groupData.name === ''" @click="checkOrCreateGroup()">
                    Create group
                </button>
            </div>

            <ul>
                <li v-for="group in groups" :key="group.id">
                    <RouterLink :to="`/groups/${group.id}`">
                        <pre>{{ group }}</pre>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const router = useRouter();
    const { createGroup, getAllGroups, getGroup } = useGroup();
    const { signedIn, user } = useUser();
    const groups = ref<Group[]>([]);
    const groupData = reactive<Group>({
        id: uuidV4(),
        name: "",
        partecipants: [],
        chores: []
    });

    if (!signedIn.value) {
        router.push("/login");
    }

    const checkOrCreateGroup = async() => {
        const exists = await getGroup(groupData.name);

        if (!exists) {
            console.log("adding user: ", user);
            groupData.partecipants.push({
                id: user.value.user.uid,
                owner: true
            });
            await createGroup(groupData);
            groups.value = await getAllGroups();
        } else {
            alert("Group already exists");
        }
    };

    groups.value = await getAllGroups();
</script>
