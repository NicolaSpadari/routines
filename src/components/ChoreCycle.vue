<template>
    <div flex mt-10 space-x-5>
        <div v-for="(partecipant, index) in props.partecipants" :key="partecipant.user.id">
            <p mb-5>
                {{ partecipant.user.name }}
            </p>
            <p v-for="chore in getShiftedChores(props.chores, index)" :key="`${partecipant.user.id}-${chore.name}`" space-x-2>
                <span>{{ chore.name }}</span>
                <button v-if="partecipant.user.id === user.user.uid && !chore.completed" class="i-heroicons-outline-check w-4 h-4" @click="markCompleted(chore)" />
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps<{
        chores: Chore[]
        partecipants: Partecipant[]
    }>();

    const emit = defineEmits(["completed"]);
    const { user } = useUser();
    const { getShiftedChores } = useChore();
    const { sendMessage } = useMessage();

    const markCompleted = (chore: Chore) => {
        emit("completed", chore);
        sendMessage(`${user.value.user?.displayName} completed ${chore.name}`);
    };
</script>
