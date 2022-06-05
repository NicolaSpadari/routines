import { resolve } from "path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { VitePWA } from "vite-plugin-pwa";
import { DirResolverHelper, dirResolver } from "vite-auto-import-resolvers";
import Unocss from "unocss/vite";

const VITE_ENV: Record<string, string> = {};

Object.keys(process.env).forEach((key) => {
    if (key.startsWith("VITE_")) {
        VITE_ENV[`import.meta.env.${key}`] = process.env[key]!;
    }
});

export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src")
        }
    },
    plugins: [
        Vue({
            include: [/\.vue$/],
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith("i-")
                }
            }
        }),
        Pages({
            extensions: ["vue"]
        }),
        Unocss(),
        Components({
            deep: false
        }),
        DirResolverHelper(),
        AutoImport({
            imports: [
                "vue",
                "vue-router",
                "@vueuse/core",
                "@vueuse/head",
                {
                    "@/firebase": ["auth", "db"],
                    "uuid": [["v4", "uuidV4"]],
                    "firebase/app": ["initializeApp"],
                    "firebase/auth": ["GoogleAuthProvider", "signInWithPopup", "getAuth"],
                    "firebase/firestore": [
                        "getFirestore",
                        "collection",
                        "doc",
                        "getDoc",
                        "getDocs",
                        "setDoc",
                        "updateDoc",
                        "deleteDoc",
                        "query",
                        "where",
                        "arrayUnion",
                        "arrayRemove"
                    ]
                }
            ],
            resolvers: [dirResolver()]
        }),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.svg", "safari-pinned-tab.svg"],
            manifest: {
                name: "Vitesse",
                short_name: "Vitesse",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png"
                    },
                    {
                        src: "/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable"
                    }
                ]
            }
        })
    ],
    define: VITE_ENV,
    server: {
        fs: {
            allow: [".."]
        },
        host: true
    }
});
