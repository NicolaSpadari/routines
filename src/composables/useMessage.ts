const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_GROUP_ID = import.meta.env.VITE_TELEGRAM_GROUP_ID;

const useMessage = () => {
    const sendMessage = (msg: string) => {
        const BOT_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;
        msg = encodeURIComponent(msg);

        useFetch(`${BOT_URL}/sendMessage?chat_id=${TELEGRAM_GROUP_ID}&text=${msg}`).post();
    };

    return {
        sendMessage
    };
};

export { useMessage };
export default useMessage;
