import { useState, useEffect } from 'react'
import axios from "axios";

export default function useFetch<T>(url: string) { 
    const [data, setData] = useState<T>()

    useEffect(() => { 
        const fetch = async () => {
            const resp = await axios(url);
            const data: T = resp.data.categories;
            setData(data);
        }

        fetch();
    }, [url])

    return {data}
}