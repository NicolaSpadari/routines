import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import { router } from "@/router";
import App from "@/App.vue";
import "@unocss/reset/tailwind.css";
import "uno.css";

const head = createHead();
const app = createApp(App);

app.use(head);
app.use(router);

router.isReady().then(() => {
    app.mount("#app");
});
