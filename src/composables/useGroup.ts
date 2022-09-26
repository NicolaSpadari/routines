import type { QueryConstraint } from "firebase/firestore";

const useGroup = () => {
    const createGroup = async (groupData: Group) => {
        const { showAlert } = useAlert();

        try {
            await setDoc(doc(collection(db, "groups"), groupData.id), {
                ...groupData
            });
        } catch (err: any) {
            showAlert(err);
        }
    };

    const getGroup = async (groupId: string): Promise<Group | null> => {
        const { showAlert } = useAlert();
        let group = null;

        try {
            const result = await getDoc(doc(db, "groups", groupId));

            if (result.exists()) {
                group = result.data();
            }
        } catch (err: any) {
            showAlert(err);
        }

        return group as Group;
    };

    const getUserGroups = async (userId: string) => {
        const { getUser } = useUser();
        const user = await getUser(userId);
        const { showAlert } = useAlert();
        const groups = [] as Group[];

        try {
            const querySnapshot = await getDocs(query(collection(db, "groups"), where("partecipants", "array-contains", {
                user,
                owner: true || false
            })));
            querySnapshot.forEach((doc) => {
                groups.push(doc.data() as Group);
            });
        } catch (err: any) {
            showAlert(err);
        }

        return groups;
    };

    const getAllGroups = async () => {
        const groups: Group[] = [];
        const { showAlert } = useAlert();

        try {
            const qrySnap = await getDocs(query(collection(db, "groups")));

            qrySnap.forEach((doc) => {
                groups.push(doc.data() as Group);
            });
        } catch (err: any) {
            showAlert(err);
        }

        return groups;
    };

    const getGroupPartecipants = async (currentGroup: Group) => {
        const { showAlert } = useAlert();
        const queryConstraints = [] as QueryConstraint[];
        const groupPartecipants = [] as User[];

        try {
            currentGroup?.partecipants.forEach((partecipant: Partecipant) => {
                queryConstraints.push(where("id", "==", partecipant.user.id));
            });

            const querySnapshot = await getDocs(query(collection(db, "users"), ...queryConstraints));
            querySnapshot.forEach((doc) => {
                groupPartecipants.push(doc.data() as User);
            });
        } catch (err: any) {
            showAlert(err);
        }

        return groupPartecipants;
    };

    const leaveGroup = async (groupId: string, partecipant: Partecipant) => {
        const { showAlert } = useAlert();
        const { sendMessage } = useMessage();

        try {
            await updateDoc(doc(db, "groups", groupId), {
                partecipants: arrayRemove(partecipant)
            });

            sendMessage(`${partecipant.user.name} left the group`);
        } catch (err: any) {
            showAlert(err);
        }
    };

    const deleteGroup = async (groupId: string): Promise<void> => {
        const { showAlert } = useAlert();

        try {
            await deleteDoc(doc(db, "groups", groupId));
        } catch (err: any) {
            showAlert(err);
        }
    };

    const isGroupOwner = (group: Group, userId: string) => {
        const user = group.partecipants.find((partecipant: Partecipant) => partecipant.user.id === userId);
        return user?.owner;
    };

    return {
        getGroup,
        getGroupPartecipants,
        getUserGroups,
        getAllGroups,
        createGroup,
        deleteGroup,
        leaveGroup,
        isGroupOwner
    };
};

export { useGroup };
export default useGroup;
