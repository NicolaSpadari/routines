const useInvite = () => {
    const invite = async(userId: string, groupId: string) => {
        const { user: me, getUser } = useUser();
        const { getGroup } = useGroup();
        const { sendMessage } = useMessage();
        const inviteId = uuidV4();

        try {
            const newInvite = {
                id: inviteId,
                inviteFrom: await getUser(me.value.user?.uid),
                inviteTo: await getUser(userId),
                inviteToGroup: await getGroup(groupId),
                accepted: false
            };

            await setDoc(doc(db, "invites", inviteId), newInvite);

            sendMessage(`${newInvite.inviteFrom.name} invited ${newInvite.inviteTo.name} to join ${newInvite.inviteToGroup.name}`);
        } catch (err) {
            console.error("Error inviting user: ", err);
        }
    };

    const getInvitesSent = async(userId: string) => {
        const invites = [] as Invite[];

        try {
            const querySnapshot = await getDocs(query(collection(db, "invites"), where("inviteFrom.id", "==", userId)));
            querySnapshot.forEach((doc) => {
                invites.push(doc.data() as Invite);
            });
        } catch (err) {
            console.error("Can't get invites sent: ", err);
        }

        return invites;
    };

    const getInvitesReceived = async(userId: string) => {
        const invites = [] as Invite[];

        try {
            const querySnapshot = await getDocs(query(collection(db, "invites"), where("inviteTo.id", "==", userId)));
            querySnapshot.forEach(async(doc) => {
                invites.push(doc.data() as Invite);
            });
        } catch (err) {
            console.error("Can't get invites received: ", err);
        }

        return invites;
    };

    const acceptInvite = async(inviteId: string, groupId: string, partecipant: Partecipant) => {
        const { sendMessage } = useMessage();

        try {
            await updateDoc(doc(db, "groups", groupId), {
                partecipants: arrayUnion(partecipant)
            });
            await updateDoc(doc(db, "invites", inviteId), {
                accepted: true
            });

            sendMessage(`${partecipant.user.name} accepted the invite!`);
        } catch (err) {
            console.error("Error accepting invite:", err);
        }
    };

    const deleteInvite = async(inviteId: string) => {
        try {
            await deleteDoc(doc(db, "invites", inviteId));
        } catch (err) {
            console.error("Error deleting invite:", err);
        }
    };

    return {
        invite,
        getInvitesSent,
        getInvitesReceived,
        acceptInvite,
        deleteInvite
    };
};

export { useInvite };
export default useInvite;
