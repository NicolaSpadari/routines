import type { DocumentData, QueryConstraint } from "firebase/firestore";

const useGroup = () => {
    const createGroup = async(groupData: Group) => {
        try {
            await setDoc(doc(collection(db, "groups"), groupData.id), {
                ...groupData
            });
        } catch (err) {
            console.error("Error creating group: ", err);
        }
    };

    const getGroup = async(groupId: string): Promise<DocumentData | null> => {
        let group = null;

        try {
            const result = await getDoc(doc(db, "groups", groupId));

            if (result.exists()) {
                group = result.data();
            }
        } catch (err) {
            console.error("Error retrieving group", err);
        }

        return group;
    };

    const getUserGroups = async(userId: string) => {
        const groups = [] as Group[];

        try {
            const querySnapshot = await getDocs(query(collection(db, "groups"), where("partecipants", "array-contains", { id: userId, owner: true || false })));
            querySnapshot.forEach((doc) => {
                groups.push(doc.data() as Group);
            });
        } catch (err) {
            console.error("Can't get user groups: ", err);
        }

        return groups;
    };

    const getAllGroups = async() => {
        const groups: DocumentData[] = [];

        try {
            const qrySnap = await getDocs(query(collection(db, "groups")));

            qrySnap.forEach((doc) => {
                groups.push(doc.data());
            });
        } catch (e) {
            console.error("Error retrieving groups", e);
        }

        return groups;
    };

    const getGroupPartecipants = async(currentGroup: Group) => {
        const queryConstraints = [] as QueryConstraint[];
        const groupPartecipants = [] as User[];

        try {
            currentGroup?.partecipants.forEach((partecipant: { id: string; owner: boolean }) => {
                queryConstraints.push(where("id", "==", partecipant.id));
            });

            const querySnapshot = await getDocs(query(collection(db, "users"), ...queryConstraints));
            querySnapshot.forEach((doc) => {
                groupPartecipants.push(doc.data() as User);
            });
        } catch (err) {
            console.error("Error getting group partecipants", err);
        }

        return groupPartecipants;
    };

    const deleteGroup = async(groupId: string): Promise<void> => {
        try {
            await deleteDoc(doc(db, "groups", groupId));
        } catch (err) {
            console.error("Error deleting group", err);
        }
    };

    return {
        getGroup,
        getGroupPartecipants,
        getUserGroups,
        getAllGroups,
        createGroup,
        deleteGroup
    };
};

export { useGroup };
export default useGroup;
