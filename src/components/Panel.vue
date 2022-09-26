<template>
    <Teleport to="body">
        <div z-10 relative role="dialog">
            <Transition name="fade">
                <div v-show="props.isOpen" bg-gray-500 bg-opacity-75 inset-0 transition-opacity fixed />
            </Transition>

            <div inset-0 fixed overflow-hidden :class="props.isOpen ? '' : 'pointer-events-none'">
                <div id="backdrop" inset-0 absolute overflow-hidden>
                    <div flex max-w-full max-h-screen inset-y-0 left-0 pointer-events-none fixed>
                        <Transition name="slide">
                            <div v-show="props.isOpen" ref="panel" w-screen transform pointer-events-auto mt-auto>
                                <div bg-white flex flex-col h-full shadow-xl rounded-t-xl p-4>
                                    <slot />
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
    const props = defineProps({
        isOpen: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(["close"]);

    const panel = ref<HTMLElement | null>(null);

    onClickOutside(panel, (e: any) => {
        if (e.target.id === "backdrop") {
            emit("close");
        }
    });
</script>
