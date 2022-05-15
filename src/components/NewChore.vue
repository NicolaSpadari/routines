<template>
    <div>
        <input v-model="newChore.name" type="text" placeholder="New chore name">

        <button @click="updateChores()">
            Add
        </button>
    </div>
</template>

<script lang="ts" setup>
    import { db } from "@/firebase";

    const props = defineProps({
        groupId: {
            type: String,
            required: true
        }
    });

    const emit = defineEmits(["added"]);

    const newChore = reactive<Chore>({
        name: "",
        assignedTo: null,
        completed: false
    });

    const updateChores = async() => {
        try {
            await updateDoc(doc(db, "groups", props.groupId), {
                chores: arrayUnion(newChore)
            });
            console.log("added");
            emit("added");
        } catch (err) {
            console.error("Error updating chores:", err);
        }
    };
</script>
