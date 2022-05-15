<template>
    <div>
        <div container mt-10>
            Invites I sent:

            <pre>{{ invitesSent }}</pre>
        </div>

        <div container mt-10>
            Invites I received:

            <pre>{{ invitesReceived }}</pre>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const { user } = useUser();
    const invitesSent = ref<any[]>([]);
    const invitesReceived = ref<any[]>([]);

    const getInvitesSent = async() => {
        try {
            const querySnapshot = await getDocs(query(collection(db, "invites"), where("inviteFrom", "==", user.value.user?.uid)));
            querySnapshot.forEach((doc) => {
                invitesSent.value.push(doc.data() as User);
            });
        } catch (err) {
            console.error("Can't get invites sent: ", err);
        }
    };

    const getInvitesReceived = async() => {
        try {
            const querySnapshot = await getDocs(query(collection(db, "invites"), where("inviteTo", "==", user.value.user?.uid)));
            querySnapshot.forEach((doc) => {
                invitesReceived.value.push(doc.data() as User);
            });
        } catch (err) {
            console.error("Can't get invites received: ", err);
        }
    };

    getInvitesSent();
    getInvitesReceived();
</script>
