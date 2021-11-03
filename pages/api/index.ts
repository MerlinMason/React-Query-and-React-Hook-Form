import axios from "axios";

axios.defaults.headers.common["app-id"] = String(process.env.DUMMY_API_APP_ID);
