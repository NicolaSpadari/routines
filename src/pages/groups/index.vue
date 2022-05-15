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
                        {{ group }}
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type { DocumentData } from "firebase/firestore";

    const router = useRouter();
    const { createGroup, getGroupByName } = useGroup();
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

    const getGroups = async(): Promise<Group[]> => {
        try {
            const docs: DocumentData[] = [];
            const qrySnap = await getDocs(query(collection(db, "groups")));

            qrySnap.forEach((doc) => {
                docs.push(doc.data());
            });

            return docs as Group[];
        } catch (e) {
            console.error("Error retrieving groups", e);
            return [] as DocumentData[] as Group[];
        }
    };

    const checkOrCreateGroup = async() => {
        const exists = await getGroupByName(groupData.name);

        if (!exists) {
            console.log("adding user: ", user);
            groupData.partecipants.push({
                id: user.value.user.uid,
                owner: true
            });
            await createGroup(groupData);
            groups.value = await getGroups();
        } else {
            alert("Group already exists");
        }
    };

    groups.value = await getGroups();
</script>
