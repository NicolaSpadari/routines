const useUser = () => {
    const user = useLocalStorage<User | EmptyUser>("user", { user: null });

    const signedIn = computed<boolean>(() => user.value.user !== null);

    const login = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            await setDoc(doc(db, "users", result.user.uid), {
                id: result.user.uid,
                name: result.user.displayName,
                email: result.user.email,
                picture: result.user.photoURL
            });
            user.value = result as unknown as User;
        } catch (err) {
            console.error("Error adding user: ", err);
        }
    };

    const logout = async() => {
        await auth.signOut();
        user.value = { user: null };
    };

    const getUsers = async() => {
        const users = [] as User[];

        try {
            const querySnapshot = await getDocs(query(collection(db, "users")));
            querySnapshot.forEach((doc) => {
                users.push(doc.data() as User);
            });
        } catch (err) {
            console.error("Error adding user: ", err);
        }

        return users;
    };

    return {
        user,
        signedIn,
        getUsers,
        login,
        logout
    };
};

export { useUser };
export default useUser;
