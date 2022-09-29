<template>
    <div max-w-sm mx-auto relative>
        <input
            id="new-chore"
            v-model="newChore.name"
            type="text"
            placeholder="New chore name"
            w-full py-3 pr-10 border-gray-200 rounded-md shadow-sm sm="text-sm" outline-none
        >

        <span absolute inset-y-0 right-0 grid place-content-center>
            <button
                type="button"
                text-white
                bg-blue-500 p-1 rounded-full w-8 h-8 @click="addAndCleanChore(props.groupId, newChore); emit('added')"
            >
                <i-heroicons-outline-plus w-4 h-4 />
            </button>
        </span>
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
        await addChore(groupId, chore, false);
        newChore.name = "";
    };
</script>
