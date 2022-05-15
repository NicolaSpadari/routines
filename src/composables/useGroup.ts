import type { DocumentData } from "firebase/firestore";

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
        try {
            const result = await getDoc(doc(db, "groups", groupId));

            if (result.exists()) {
                return result.data();
            } else {
                return null;
            }
        } catch (err) {
            console.error("Error retrieving documents", err);
            return null;
        }
    };

    const getGroupByName = async(groupName: string): Promise<DocumentData | null> => {
        try {
            const result = await getDoc(doc(db, "groups", groupName));

            if (result.exists()) {
                console.log(result.data());
                return result.data();
            } else {
                console.log("no group found");
                return null;
            }
        } catch (err) {
            console.error("Error retrieving documents", err);
            return null;
        }
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
        getGroupByName,
        createGroup,
        deleteGroup
    };
};

export { useGroup };
export default useGroup;
