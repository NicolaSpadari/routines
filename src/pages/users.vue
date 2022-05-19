<route>
{
    meta: {
        requiresAuth: true
    }
}
</route>

<template>
    <div container mt-20>
        <input v-model="kw" placeholder="Search user">
        <ul space-y-5>
            <template v-for="user in users" :key="user.id">
                <li v-if="me.user.uid !== user.id">
                    <p>{{ user.name }} - <span text-sm text-gray-300>({{ user.email }})</span></p>

                    <p v-if="alreadyInvited(user.id)">
                        Already invited

                        {{ alreadyMember(user.id) ? "and a member" : "but not a member" }}
                    </p>

                    <template v-else>
                        <div v-if="ownsGroup(me.user.uid)" space-x-5>
                            <button v-for="group in groups" :key="group.id" border-1 border-dark-800 @click="inviteUser(user.id, group.id)">
                                Invite in {{ group.name }}
                            </button>
                        </div>
                        <p v-else text-xs underline text-gray-500>
                            (You need to own a group to invite someone)
                        </p>
                    </template>
                </li>
            </template>
        </ul>

        <p v-if="alreadySearched && kw.value !== ''" class="text-right mt-3 mb-1">
            {{ users.length }} results found
        </p>
    </div>
</template>

<script lang="ts" setup>
    const { user: me, getUsersByName } = useUser();
    const { getUserGroups, getAllGroups } = useGroup();
    const { invite, getInvitesSent } = useInvite();
    const users = ref<User[]>([]);
    const groups = ref<Group[]>([]);
    const myGroups = ref<Group[]>([]);
    const invitesSent = ref<Invite[]>([]);
    const alreadySearched = ref(false);
    const kw = ref("");

    const alreadyInvited = (userId: string) => {
        return invitesSent.value.some((invite) => invite.inviteTo.id === userId);
    };
    const alreadyMember = (userId: string) => {
        return invitesSent.value.some((invite) => invite.inviteTo.id === userId && invite.accepted);
    };

    invitesSent.value = await getInvitesSent(me.value.user.uid);
    groups.value = await getAllGroups();
    myGroups.value = await getUserGroups(me.value.user.uid);

    const ownsGroup = (userId: string) => {
        return groups.value.some((group) => group.partecipants.some((partecipant) => partecipant.user.id === userId));
    };

    const inviteUser = async(userId: string, groupId: string) => {
        await invite(userId, groupId);
        invitesSent.value = await getInvitesSent(me.value.user.uid);
    };

    const search = useDebounceFn(async() => {
        console.log("searching...");

        if (kw.value !== "") {
            users.value = await getUsersByName(kw.value);
            alreadySearched.value = true;
        } else {
            users.value = [];
        }
    }, 300);

    watch(kw, () => {
        search();
    });
</script>
