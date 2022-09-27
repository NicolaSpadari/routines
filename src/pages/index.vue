<template>
    <div crate mt-5>
        <div v-if="signedIn" space-y-20>
            <div space-y-10>
                <div flex justify-between items-center>
                    <p text-3xl text-broncos sm="text-4xl">
                        Hello, <span font-bold>{{ user.displayName.split(" ")[0] }}!</span>
                    </p>

                    <img v-if="signedIn" :src="user.photoURL" w-12 h-12 rounded-full shadow-lg>
                </div>
            </div>
            <div mt-10>
                <div flex items-center justify-center space-x-5>
                    <span w-20 border-b border-gray-300 />

                    <p text-xs text-center text-gray-500 uppercase>
                        Your groups
                    </p>

                    <span w-20 border-b border-gray-300 />
                </div>

                <div grid lg="grid-cols-2 gap-4" space-y-5 mt-5>
                    <RouterLink v-for="group in myGroups" :key="group.id" :to="`/groups/${group.id}`" block p-8 bg-white shadow-xl hover="shadow-2xl" transition-shadow rounded-xl>
                        <p text-xl font-bold text-broncos>
                            {{ group.name }} <span text-gray-400 text-base font-normal>&middot; {{ group.chores.length }} chores</span>
                        </p>

                        <div flex items-center mt-4>
                            <div flex space-x--2>
                                <template v-if="group.partecipants.length > maxPartecipants">
                                    <img v-for="i in maxPartecipants" :key="group.partecipants[i].user.id" :src="group.partecipants[i].user.picture" inline-block h-10 w-10 rounded-full ring-2 ring-white>
                                    <div inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gray-300 flex items-center justify-center>
                                        <p text-dark-800 text-xs>
                                            + {{ group.partecipants.length - maxPartecipants }}
                                        </p>
                                    </div>
                                </template>
                                <template v-else>
                                    <img v-for="person in group.partecipants" :key="person.user.id" :src="person.user.picture" inline-block h-10 w-10 rounded-full ring-2 ring-white>
                                </template>
                            </div>
                        </div>

                        <p mt-4 text-sm text-gray-400>
                            Owner: {{ group.partecipants.find(p => p.owner).user.name }}
                        </p>
                    </RouterLink>
                </div>
            </div>
        </div>

        <div v-else>
            <Badge active @click="login()">
                Login
            </Badge>
        </div>
    </div>
</template>

<script lang="ts" setup>
    useHead({
        title: "Home",
        meta: [
            {
                name: "description",
                content: "Homepage description"
            }
        ]
    });

    const { user, signedIn, login } = useUser();
    const { getUserGroups } = useGroup();
    const myGroups = ref<Group[]>([]);
    const maxPartecipants = 4;

    onBeforeMount(async () => {
        if (signedIn) {
            const gps = await getUserGroups(user.value.uid);
            myGroups.value = gps;
        }
    });
</script>
