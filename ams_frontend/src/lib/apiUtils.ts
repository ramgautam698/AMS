import axios from "axios";

let baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL + '/';

class ApiUtils
{
    get(api="api/", params=null)
    {
        api = baseUrl + api;
        if(params)
        {
            api = api + "?";
            for (let key in params)
            {
                api = api + key + "=" + params[key] + "&&";
            }
        }
        // console.log("api = ", api);
        return axios.get(api, {
            headers :
            {
                "Authorization" : "Bearer " + sessionStorage.getItem("token"),
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*"
            }
        })
    }

    post(api="api/", data={})
    {
        api = baseUrl + api;
        // console.log("api = ", api);
        return axios.post(api, data, {
            headers :
            {
                "Authorization" : "Bearer " + sessionStorage.getItem("token"),
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*"
            }
        })
    }

    delete(api="api/", params=null)
    {
        api = baseUrl + api;
        if(params)
        {
            api = api + "?";
            for (let key in params)
            {
                api = api + key + "=" + params[key] + "&&";
            }
        }
        return axios.delete(api, {
            headers :
            {
                "Authorization" : "Bearer " + sessionStorage.getItem("token"),
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*"
            }
        })
    }

    getHeaders()
    {
        const headers = {
            "Authorization" : "Bearer " + sessionStorage.getItem("token"),
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        };
        return headers;
    }
}

export default new ApiUtils();