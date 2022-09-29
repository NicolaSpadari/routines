import { StorageSerializers } from "@vueuse/core";

const user = useLocalStorage<User>("user", null, { serializer: StorageSerializers.object });
const signedIn = computed<boolean>(() => user.value !== null);

const useUser = () => {
    const { showAlert } = useAlert();

    const login = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            await setDoc(doc(db, "users", result.user.uid), {
                id: result.user.uid,
                name: result.user.displayName,
                email: result.user.email,
                picture: result.user.photoURL
            });
            user.value = result.user as unknown as User;
        } catch (err: any) {
            showAlert(`login: ${err}`);
        }
    };

    const logout = async () => {
        await auth.signOut();
        user.value = null;
    };

    const getUser = async (userId: string) => {
        const { showAlert } = useAlert();
        let user = null;

        try {
            const result = await getDoc(doc(db, "users", userId));

            if (result.exists()) {
                user = result.data();
            }
        } catch (err: any) {
            showAlert(`getUser: ${err}`);
        }

        return user;
    };

    const getUsers = async () => {
        const { showAlert } = useAlert();
        const users = [] as User[];

        try {
            const querySnapshot = await getDocs(query(collection(db, "users")));
            querySnapshot.forEach((doc) => {
                users.push(doc.data() as User);
            });
        } catch (err: any) {
            showAlert(`getUsers: ${err}`);
        }

        return users;
    };

    const getUsersByName = async (name: string) => {
        const { showAlert } = useAlert();
        const users = [] as User[];

        try {
            const querySnapshot = await getDocs(query(collection(db, "users"), where("name", ">=", name), where("name", "<=", `${name}\uF8FF`)));
            querySnapshot.forEach((doc: any) => {
                users.push(doc.data() as User);
            });
        } catch (err: any) {
            showAlert(`getUsersByName: ${err}`);
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
