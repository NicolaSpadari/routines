const useChore = () => {
    const addChore = async (groupId: string, newChore: Chore, notify = true) => {
        const { showAlert } = useAlert();
        const { sendMessage } = useMessage();

        try {
            await updateDoc(doc(db, "groups", groupId), {
                chores: arrayUnion(newChore)
            });

            if (notify) {
                sendMessage(`Chore ${newChore.name} was added to the group`);
            }
        } catch (err: any) {
            showAlert(`addChore: ${err}`);
        }
    };

    const deleteChore = async (groupId: string, chore: Chore, notify = true) => {
        const { showAlert } = useAlert();
        const { sendMessage } = useMessage();

        try {
            await updateDoc(doc(db, "groups", groupId), {
                chores: arrayRemove(chore)
            });

            if (notify) {
                sendMessage(`${chore.name} was removed from the group`);
            }
        } catch (err: any) {
            showAlert(`deleteChore: ${err}`);
        }
    };

    const resetChores = async (groupId: string) => {
        const { showAlert } = useAlert();
        const { getGroup } = useGroup();

        try {
            const group = await getGroup(groupId);
            const emptyChores = group?.chores.map((chore: Chore) => {
                chore.completed = [];
                return chore;
            });

            console.log(group)

            await updateDoc(doc(db, "groups", groupId), {
                chores: emptyChores
            });
        } catch (err: any) {
            showAlert(`resetChore: ${err}`);
        }
    };

    const getShiftedChores = (chores: Chore[], num: number) => {
        const i = chores.length - num;
        return chores.slice(i).concat(chores.slice(0, i));
    };

    return {
        addChore,
        deleteChore,
        getShiftedChores,
        resetChores
    };
};

export { useChore };
export default useChore;
