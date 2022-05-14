import { doc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/firebase";

const useUser = () => {
    const user = useLocalStorage<User>("user", { user: null });

    const signedIn = computed<boolean>(() => user.value.user !== null);

    const login = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            await setDoc(doc(db, "users", <string>result.user.uid), {
                id: result.user.uid,
                name: result.user.displayName,
                email: result.user.email,
                picture: result.user.photoURL
            });
            user.value = result;
        } catch (err) {
            console.error("Error adding user: ", err);
        }
    };

    const logout = async() => {
        await auth.signOut();
        user.value = { user: null };
    };

    return {
        user,
        signedIn,
        login,
        logout
    };
};

export { useUser };
export default useUser;
