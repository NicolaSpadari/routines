const useInvite = () => {
    const invite = async(userId: string) => {
        const { user: me } = useUser();
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

    const getInvitesSent = async(userId: string) => {
        const invites = [] as Invite[];

        try {
            const querySnapshot = await getDocs(query(collection(db, "invites"), where("inviteFrom", "==", userId)));
            querySnapshot.forEach((doc) => {
                invites.push(doc.data() as Invite);
            });
        } catch (err) {
            console.error("Can't get invites sent: ", err);
        }

        return invites;
    };

    return {
        invite,
        getInvitesSent
    };
};

export { useInvite };
export default useInvite;
