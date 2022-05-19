<template>
    <div>
        <input v-model="newChore.name" type="text" placeholder="New chore name">

        <button @click="addChore(props.groupId, newChore); newChore.name = ''; emit('added')">
            Add
        </button>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        groupId: {
            type: String,
            required: true
        }
    });

    const emit = defineEmits(["added"]);
    const { addChore } = useChore();

    const newChore = reactive<Chore>({
        name: "",
        completed: false
    });
</script>
