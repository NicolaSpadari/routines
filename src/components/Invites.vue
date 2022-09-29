<template>
    <div>
        <div container>
            Invites I sent:

            <pre>{{ invitesSent }}</pre>
        </div>

        <div container mt-10>
            Invites I received:

            <ul>
                <li v-for="invite in invitesReceived" :key="invite.id">
                    <button v-if="!invite.accepted" @click="acceptInvite(invite.id, invite.inviteToGroup.id, { user: { id: me.uid, name: me.displayName, email: me.email, picture: me.photoURL }, owner: false }); $router.push(`/groups/${invite.inviteToGroup.id}`)">
                        Join "{{ invite.inviteToGroup.name }}"
                        <span text-xs text-gray-500 ml-2>(from {{ invite.inviteFrom.name }})</span>
                    </button>
                    <RouterLink v-else :to="`/groups/${invite.inviteToGroup.id}`">
                        {{ invite.inviteToGroup.name }} <span text-xs text-gray-500 ml-2>(from {{ invite.inviteFrom.name }} - already accepted)</span>
                    </RouterLink>

                    <button v-if="!invite.accepted" ml-3 @click="deleteInvite(invite.id)">
                        delete request
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const { user: me } = useUser();
    const { getInvitesSent, getInvitesReceived, acceptInvite, deleteInvite } = useInvite();
    const invitesSent = ref<Invite[]>([]);
    const invitesReceived = ref<Invite[]>([]);

    invitesSent.value = await getInvitesSent(me.value.uid);
    invitesReceived.value = await getInvitesReceived(me.value.uid);
</script>
