<template>
    <div crate>
        <div overflow-hidden overflow-x-auto border border-gray-100 rounded mt-20>
            <table min-w-full text-sm>
                <tbody divide-y divide-gray-100>
                    <tr v-for="(partecipant, index) in props.partecipants" :key="partecipant.user.id">
                        <td px-4 py-2 text-gray-700 whitespace-nowrap :class="allChoresCompleted(partecipant.user.id).value ? 'bg-green-300' : ''">
                            <p font-bold>
                                {{ partecipant.user.name }} - {{ allChoresCompleted(partecipant.user.id) }}
                            </p>
                        </td>
                        <td
                            v-for="chore in getShiftedChores(props.chores, index)"
                            :key="`${partecipant.user.id}-${chore.id}`"
                            px-4 py-2 font-medium whitespace-nowrap
                        >
                            <div flex space-x-3>
                                <input
                                    :id="`${partecipant.user.id}-${chore.id}`"
                                    :disabled="!chore.completed.includes(partecipant.user.id) && partecipant.user.id !== user.uid"
                                    :checked="chore.completed.includes(partecipant.user.id)"
                                    w-5 h-5 border-gray-200 rounded pointer
                                    type="checkbox"
                                    @change="handleCheck($event, chore)"
                                >
                                <p>{{ chore.name }}</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="allChoresCompleted(user.uid).value" text-center mt-5>
            <p font-bold text-green-500>
                You are all done!
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps<{
        groupId: string
        chores: Chore[]
        partecipants: Partecipant[]
    }>();

    const emit = defineEmits(["completed"]);
    const { user } = useUser();
    const { showAlert } = useAlert();
    const { getShiftedChores, resetChores } = useChore();

    const handleCheck = (e: any, chore: Chore) => {
        if (e.target.checked) {
            emit("completed", chore);
        }
    };

    const allChoresCompleted = (partecipantId: string) => computed(() => props.chores.every((chore: Chore) => chore.completed.includes(partecipantId)));

    if (props.partecipants.every((partecipant: Partecipant) => allChoresCompleted(partecipant.user.id).value)) {
        resetChores(props.groupId);
        showAlert("Chores have been reset");
    }
</script>
