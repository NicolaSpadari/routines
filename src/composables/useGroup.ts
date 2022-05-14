import type { DocumentData } from "firebase/firestore";
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

const useGroup = () => {
    const group = useLocalStorage<Group>("group", { user: null });

    const createGroup = async(groupData: Group) => {
        try {
            await setDoc(doc(collection(db, "groups"), "12345"), {
                ...groupData
            });

            group.value = groupData;
        } catch (err) {
            console.error("Error creating group: ", err);
        }
    };

    const getGroup = async(groupId: string): Promise<DocumentData | null> => {
        try {
            const result = await getDoc(doc(db, "groups", groupId));

            if (result.exists()) {
                group.value = result.data();
                return result.data();
            } else {
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
        group,
        getGroup,
        createGroup,
        deleteGroup
    };
};

export { useGroup };
export default useGroup;
