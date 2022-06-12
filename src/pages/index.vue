<template>
    <div mt-5>
        <div v-if="signedIn" space-y-20>
            <div space-y-10>
                <div flex justify-between items-center>
                    <p text-3xl text-broncos sm="text-4xl">
                        Hello, <span font-bold>{{ user.user.displayName.split(" ")[0] }}!</span>
                    </p>

                    <img v-if="signedIn" :src="user.user.photoURL" w-12 h-12 rounded-full shadow-lg>
                </div>

                <div flex space-x-5 overflow-x-auto max-w-full pb-2>
                    <Badge active>
                        Groups
                    </Badge>
                    <Badge>
                        Tasks
                    </Badge>
                </div>
            </div>
            <div>
                <p text-lg text-dark-800 font-bold>
                    Recent
                </p>
            </div>
        </div>

        <div v-else>
            Login
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

    const { user, signedIn } = useUser();
</script>
