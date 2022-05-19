const useUser = () => {
    const { showAlert } = useAlert();
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
            showAlert(err);
        }
    };

    const logout = async() => {
        await auth.signOut();
        user.value = { user: null };
    };

    const getUser = async(userId: string) => {
        const { showAlert } = useAlert();
        let user = null;

        try {
            const result = await getDoc(doc(db, "users", userId));

            if (result.exists()) {
                user = result.data();
            }
        } catch (err) {
            showAlert(err);
        }

        return user;
    };

    const getUsers = async() => {
        const { showAlert } = useAlert();
        const users = [] as User[];

        try {
            const querySnapshot = await getDocs(query(collection(db, "users")));
            querySnapshot.forEach((doc) => {
                users.push(doc.data() as User);
            });
        } catch (err) {
            showAlert(err);
        }

        return users;
    };

    const getUsersByName = async(name: string) => {
        const { showAlert } = useAlert();
        const users = [] as User[];

        try {
            const querySnapshot = await getDocs(query(collection(db, "users"), where("name", ">=", name), where("name", "<=", `${name}\uF8FF`)));
            querySnapshot.forEach((doc) => {
                users.push(doc.data() as User);
            });
        } catch (err) {
            showAlert(err);
        }

        return users;
    };

    return {
        user,
        signedIn,
        getUser,
        getUsers,
        getUsersByName,
        login,
        logout
    };
};

export { useUser };
export default useUser;
