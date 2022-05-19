<template>
    <div flex mt-10 space-x-5>
        <div v-for="(partecipant, index) in props.partecipants" :key="partecipant.user.id">
            <p mb-5>
                {{ partecipant.user.name }}
            </p>
            <p v-for="chore in getShiftedChores(props.chores, index)" :key="`${partecipant.user.id}-${chore.id}`" space-x-2>
                <span>{{ chore.name }}</span>
                <button v-if="partecipant.user.id === user.user.uid && !chore.completed.includes(partecipant.user.id)" class="i-heroicons-outline-check w-4 h-4" @click="emit('completed', chore)" />
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
</script>
