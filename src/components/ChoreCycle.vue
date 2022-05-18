<template>
    <div flex mt-10 space-x-5>
        <div v-for="(partecipant, index) in props.partecipants" :key="partecipant.user.id">
            <p mb-5>
                {{ partecipant.user.name }}
            </p>
            <p v-for="chore in getShiftedChores(props.chores, index)" :key="`${partecipant.user.id}-${chore.name}`">
                {{ chore.name }}
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps<{
        chores: Chore[]
        partecipants: Partecipant[]
    }>();

    const { getShiftedChores } = useChore();
</script>
