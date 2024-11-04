import axios, {AxiosInstance} from "axios";
import Cookies from "js-cookie";
// 
// export const baseURL =  `https://dev-api.mindsistemagestao.com`;
export const baseURL: string =  `http://localhost:3015`;

export const axiosConfig: AxiosInstance = axios.create({
    baseURL,    
    headers: {
        "x-access-token": Cookies.get("token-user")
    }
});
 