const useChore = () => {
    const addChore = async(groupId: string, newChore: Chore) => {
        const { showAlert } = useAlert();
        const { sendMessage } = useMessage();

        try {
            await updateDoc(doc(db, "groups", groupId), {
                chores: arrayUnion(newChore)
            });

            sendMessage("A chore was added to the group");
        } catch (err) {
            showAlert(err);
        }
    };

    const deleteChore = async(groupId: string, chore: Chore) => {
        const { showAlert } = useAlert();
        const { sendMessage } = useMessage();

        try {
            await updateDoc(doc(db, "groups", groupId), {
                chores: arrayRemove(chore)
            });

            sendMessage(`${chore.name} was removed from the group`);
        } catch (err) {
            showAlert(err);
        }
    };

    return {
        addChore,
        deleteChore
    };
};

export { useChore };
export default useChore;
