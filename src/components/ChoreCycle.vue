<template>
    <div container mt-10 mb-50>
        <p font-bold mb-5>Schedule:</p>
        <div flex space-x-10>
            <div v-for="(partecipant, index) in partecipants" :key="partecipant.user.id">
                {{ partecipant.user.name }}

                <div v-for="chore in getShiftedChores(index)" :key="`${partecipant.user.id}-${chore.name}`">
                    {{ chore.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps<{
        chores: Chore[]
        partecipants: Partecipant[]
    }>();

    const getShiftedChores = (num: number) => {
        const chores = props.chores;

        for (let i = 0; i < num; i++) {
            const newEl = chores.shift();
            chores.push(newEl);
        }

        return chores;
    };
</script>
