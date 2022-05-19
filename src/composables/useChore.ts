const useChore = () => {
    const addChore = async(groupId: string, newChore: Chore) => {
        console.log(newChore);
        const { showAlert } = useAlert();
        const { sendMessage } = useMessage();

        try {
            await updateDoc(doc(db, "groups", groupId), {
                chores: arrayUnion(newChore)
            });

            sendMessage(`Chore ${newChore.name} was added to the group`);
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

    const getShiftedChores = (chores: Chore[], num: number) => {
        const i = chores.length - num;
        return chores.slice(i).concat(chores.slice(0, i));
    };

    return {
        addChore,
        deleteChore,
        getShiftedChores
    };
};

export { useChore };
export default useChore;
