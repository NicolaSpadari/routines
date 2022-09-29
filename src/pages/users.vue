<route>
{
    meta: {
        requiresAuth: true
    }
}
</route>

<template>
    <div crate space-y-10 mt-5>
        <p text-3xl font-bold text-broncos sm="text-4xl">
            Search users
        </p>
        <div>
            <div relative>
                <input
                    v-model="kw" w-full py-3 pl-3 pr-12 text-sm text-night border-2 border-light bg-light rounded-full
                    type="text"
                    placeholder="Username"
                >

                <span absolute text-night translate-y="-55%" pointer-events-none top="1/2" right-4>
                    <i-heroicons-solid-user w-5 h-5 />
                </span>
            </div>
            <p v-if="alreadySearched && kw.value !== ''" text-right text-broncos mt-3 mb-1>
                {{ users.length }} result{{ users.length === 1 ? '' : 's' }} found
            </p>
        </div>
        <div space-y-5>
            <template v-for="user in users" :key="user.id">
                <div v-if="me.uid !== user.id" bg-white grid grid-cols-4 overflow-hidden border border-gray-100 rounded-lg>
                    <div flex justify-center items-center rounded-lg bg-night>
                        <img :src="user.picture" rounded-full w-10 h-10 border-2 border-light :alt="user.name">
                    </div>

                    <div col-span-3 space-y-2 py-3 pr-3 pl-5>
                        <p font-bold>
                            {{ user.name }}
                        </p>

                        <p v-if="alreadyInvited(user.id)" text-sm text-gray-500>
                            Already invited
                            {{ alreadyMember(user.id) ? "and a member" : "but not a member" }}
                        </p>

                        <template v-else>
                            <div v-if="ownsGroup(me.uid)" overflow-x-auto flex space-x-5>
                                <Badge v-for="group in myGroups" :key="group.id" @click="inviteUser(user.id, group.id)">
                                    Invite in {{ group.name }}
                                </Badge>
                            </div>
                            <p v-else text-xs text-gray-400>
                                You need to own a group to invite someone
                            </p>
                        </template>
                    </div>
                </div>
            </template>
        </div>
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

    invitesSent.value = await getInvitesSent(me.value.uid);
    groups.value = await getAllGroups();
    myGroups.value = await getUserGroups(me.value.uid);

    const ownsGroup = (userId: string) => {
        return myGroups.value.some((group) => group.partecipants.some((partecipant) => partecipant.user.id === userId));
    };

    const inviteUser = async (userId: string, groupId: string) => {
        await invite(userId, groupId);
        invitesSent.value = await getInvitesSent(me.value.uid);
    };

    const search = useDebounceFn(async () => {
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
