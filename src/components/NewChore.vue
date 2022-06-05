<template>
    <div>
        <input v-model="newChore.name" type="text" placeholder="New chore name">

        <button @click="addAndCleanChore(props.groupId, newChore); emit('added')">
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
        id: uuidV4(),
        name: "",
        completed: []
    });

    const addAndCleanChore = async (groupId: string, chore: Chore) => {
        await addChore(groupId, chore);
        newChore.name = "";
    };
</script>
