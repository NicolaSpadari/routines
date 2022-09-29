const useInvite = () => {
    const invite = async (userId: string, groupId: string) => {
        const { user: me, getUser } = useUser();
        const { showAlert } = useAlert();
        const { getGroup } = useGroup();
        const { sendMessage } = useMessage();
        const inviteId = uuidV4();

        try {
            const newInvite = {
                id: inviteId,
                inviteFrom: await getUser(me.value.uid),
                inviteTo: await getUser(userId),
                inviteToGroup: await getGroup(groupId),
                accepted: false
            };

            await setDoc(doc(db, "invites", inviteId), newInvite);

            sendMessage(`${newInvite.inviteFrom?.name} invited ${newInvite.inviteTo?.name} to join ${newInvite.inviteToGroup?.name}`);
        } catch (err: any) {
            showAlert(`invite: ${err}`);
        }
    };

    const getInvitesSent = async (userId: string) => {
        const { showAlert } = useAlert();
        const invites = [] as Invite[];

        try {
            const querySnapshot = await getDocs(query(collection(db, "invites"), where("inviteFrom.id", "==", userId)));
            querySnapshot.forEach((doc) => {
                invites.push(doc.data() as Invite);
            });
        } catch (err: any) {
            showAlert(`getInvitesSent: ${err}`);
        }

        return invites;
    };

    const getInvitesReceived = async (userId: string) => {
        const { showAlert } = useAlert();
        const invites = [] as Invite[];

        try {
            const querySnapshot = await getDocs(query(collection(db, "invites"), where("inviteTo.id", "==", userId)));
            querySnapshot.forEach(async (doc) => {
                invites.push(doc.data() as Invite);
            });
        } catch (err: any) {
            showAlert(`getInvitesReceived: ${err}`);
        }

        return invites;
    };

    const acceptInvite = async (inviteId: string, groupId: string, partecipant: Partecipant) => {
        const { sendMessage } = useMessage();
        const { showAlert } = useAlert();

        try {
            await updateDoc(doc(db, "groups", groupId), {
                partecipants: arrayUnion(partecipant)
            });
            await updateDoc(doc(db, "invites", inviteId), {
                accepted: true
            });

            sendMessage(`${partecipant.user.name} accepted the invite!`);
        } catch (err: any) {
            showAlert(`acceptInvite: ${err}`);
        }
    };

    const deleteInvite = async (inviteId: string) => {
        const { showAlert } = useAlert();

        try {
            await deleteDoc(doc(db, "invites", inviteId));
        } catch (err: any) {
            showAlert(`deleteInvite: ${err}`);
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
