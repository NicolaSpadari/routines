const useChore = () => {
    const addChore = async(groupId: string, newChore: Chore) => {
        const { sendMessage } = useMessage();

        try {
            await updateDoc(doc(db, "groups", groupId), {
                chores: arrayUnion(newChore)
            });

            sendMessage("A chore was added to the group");
        } catch (err) {
            console.error("Error adding new chore:", err);
        }
    };

    const deleteChore = async(groupId: string, chore: Chore) => {
        const { sendMessage } = useMessage();

        try {
            await updateDoc(doc(db, "groups", groupId), {
                chores: arrayRemove(chore)
            });

            sendMessage(`${chore.name} was removed from the group`);
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
