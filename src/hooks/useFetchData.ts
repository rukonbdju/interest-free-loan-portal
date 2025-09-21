import { baseUrl } from "@/utils/api-url";
import { useEffect, useState } from "react";

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useFetchData<T = unknown>(url: string) {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        let isMounted = true; // prevent setting state on unmounted component

        const fetchData = async () => {
            try {
                setState((prev) => ({ ...prev, loading: true }));
                const res = await fetch(baseUrl + url, { method: "GET", credentials: 'include', cache: 'no-store' });

                if (!res.ok) throw new Error(`Error: ${res.status}`);

                const result = (await res.json());
                if (isMounted) {
                    if (result?.success) {
                        setState({ data: result.data, loading: false, error: null });
                    } else {
                        setState({
                            data: null,
                            loading: false,
                            error: 'Something went wrong!',
                        });
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setState({
                        data: null,
                        loading: false,
                        error: (err as Error).message,
                    });
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url]);

    return state;
}
