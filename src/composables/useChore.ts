const useChore = () => {
    const addChore = async(groupId: string, newChore: Chore) => {
        try {
            await updateDoc(doc(db, "groups", groupId), {
                chores: arrayUnion(newChore)
            });
        } catch (err) {
            console.error("Error adding new chore:", err);
        }
    };

    const deleteChore = async(groupId: string, chore: Chore) => {
        try {
            await updateDoc(doc(db, "groups", groupId), {
                chores: arrayRemove(chore)
            });
        } catch (err) {
            console.error("Error removing chore:", err);
        }
    };

    return {
        addChore,
        deleteChore
    };
};

export { useChore };
export default useChore;
