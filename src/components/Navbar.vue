<template>
    <nav class="navbar">
        <div container py-3>
            <div flex justify-between>
                <div>
                    <RouterLink to="/">
                        Home
                    </RouterLink>
                </div>
                <div space-x-5>
                    <RouterLink to="/users">
                        Users
                    </RouterLink>
                    <RouterLink to="/groups">
                        Groups
                    </RouterLink>
                    <RouterLink to="/login">
                        Account
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>
