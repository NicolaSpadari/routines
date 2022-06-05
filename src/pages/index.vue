<template>
    <div container px-5 mt-10>
        <div v-if="signedIn" space-y-15>
            <div crate>
                <p text-3xl font-bold sm="text-4xl">
                    Welcome back, {{ user.user.displayName.split(" ")[0] }}!
                </p>
            </div>

            <div crate-sm>
                <div grid grid-cols-2 gap-4>
                    <QuickBox to="/groups" icon="i-heroicons-solid-users" desc="Test descrizione">
                        Your groups
                    </QuickBox>
                </div>
            </div>
        </div>

        <div v-else>
            <div crate>
                <p text-3xl font-bold sm="text-4xl">
                    <RouterLink to="/login" underline>Login</RouterLink>
                    to start
                </p>
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

    const { user, signedIn } = useUser();
</script>
