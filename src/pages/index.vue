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

                <div v-if="myGroups.length" grid lg="grid-cols-2 gap-4" space-y-5 mt-5>
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

                <div v-else grid grid-cols-1 md="grid-cols-2" mt-20>
                    <div>
                        <Invites />
                    </div>
                    <div>
                        <p mb-3>
                            No groups present. Create new group
                        </p>
                        <div relative>
                            <input
                                v-model="newGroup.name"
                                type="text"
                                placeholder="New group name"
                                w-full py-3 pr-13 pl-3 border-gray-200 rounded-md shadow sm="text-sm" outline-none
                            >

                            <span absolute inset-y-0 right-3 grid place-content-center>
                                <button
                                    type="button"
                                    text-white
                                    bg-blue-500 p-1 rounded-full w-8 h-8 @click="setPartecipant();createGroup(newGroup)"
                                >
                                    <i-heroicons-outline-plus w-4 h-4 />
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <div>
                <div flex justify-between items-center>
                    <p text-3xl text-broncos sm="text-4xl">
                        Please login
                    </p>

                    <Badge active @click="login()">
                        Login
                    </Badge>
                </div>
            </div>
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
    const { getUserGroups, createGroup } = useGroup();
    const myGroups = ref<Group[]>([]);
    const maxPartecipants = 4;
    const newGroup = reactive<Group>({
        id: uuidV4(),
        partecipants: [],
        name: "",
        chores: []
    });

    const setPartecipant = () => {
        newGroup.partecipants.push({
            user: {
                id: user.value.uid,
                name: user.value.displayName,
                email: user.value.email,
                picture: user.value.photoURL
            },
            owner: true
        });
    };

    onBeforeMount(async () => {
        if (signedIn.value) {
            const gps = await getUserGroups(user.value.uid);
            myGroups.value = gps;
        }
    });
</script>
