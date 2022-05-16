<template>
    <div container mt-20>
        <ul space-y-5>
            <template v-for="user in users" :key="user.id">
                <li v-if="me.user.uid !== user.id">
                    <p>{{ user.name }} - <span text-sm text-gray-300>({{ user.email }})</span></p>

                    <p v-if="alreadyInvited(user.id)">
                        Already invited
                    </p>

                    <template v-else>
                        <button v-if="ownsGroup(me.user.uid)" @click="invite(user.id)">
                            Invite
                        </button>
                        <p v-else text-xs underline text-gray-500>
                            (You need to own a group to invite someone)
                        </p>
                    </template>
                </li>
            </template>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    const { user: me, getUsers } = useUser();
    const { getAllGroups } = useGroup();
    const { invite, getInvitesSent } = useInvite();
    const users = ref<User[]>([]);
    const groups = ref<Group[]>([]);
    const invitesSent = ref<Invite[]>([]);

    const alreadyInvited = (userId: string) => {
        return invitesSent.value.some((invite) => invite.inviteTo === userId);
    };

    const ownsGroup = (userId: string) => {
        return groups.value.some((group) => group.partecipants.some((partecipant) => partecipant.id === userId && partecipant.owner));
    };

    invitesSent.value = await getInvitesSent(me.value.user?.uid);
    users.value = await getUsers();
    groups.value = await getAllGroups();
</script>
