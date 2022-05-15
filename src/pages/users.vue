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
    import type { DocumentData } from "@firebase/firestore";
    const { user: me } = useUser();
    const users = ref<User[]>([]);
    const invitesSent = ref<any[]>([]);
    const groups = ref<Group[]>([]);

    const getInvitesSent = async() => {
        try {
            const querySnapshot = await getDocs(query(collection(db, "invites"), where("inviteFrom", "==", me.value.user?.uid)));
            querySnapshot.forEach((doc) => {
                invitesSent.value.push(doc.data() as User);
            });
        } catch (err) {
            console.error("Can't get invites sent: ", err);
        }
    };

    const getUsers = async() => {
        const querySnapshot = await getDocs(query(collection(db, "users")));
        querySnapshot.forEach((doc) => {
            users.value.push(doc.data() as User);
        });
    };

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

    const invite = async(userId: string) => {
        const inviteId = uuidV4();

        try {
            await setDoc(doc(db, "invites", inviteId), {
                id: inviteId,
                inviteFrom: me.value.user?.uid,
                inviteTo: userId
            });
        } catch (err) {
            console.error("Error inviting user: ", err);
        }
    };

    const alreadyInvited = (userId: string) => {
        return invitesSent.value.some((invite) => invite.inviteTo === userId);
    };

    const ownsGroup = (userId: string) => {
        return groups.value.some((group) => group.partecipants.some((partecipant) => partecipant.owner));
    };

    getUsers();
    getInvitesSent();
    groups.value = await getGroups();
</script>
