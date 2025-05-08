import API from "../lib/api";
import { Method } from "../lib/types";
import { useState } from "react";

export const useFetchData = ({ uri }: { uri: string }) => {
  const [loading, setLoading] = useState(false);

  const fetch = async (
    data: Record<string, unknown> = {},
    method: Method = "GET",
  ) => {
    try {
      let response;
      setLoading(true);
      switch (method.toUpperCase()) {
        case "POST":
          response = await API.post(uri, { data });
          break;
        case "PUT":
          response = await API.put(uri, data);
          break;
        case "DELETE":
          response = await API.delete(uri, { data });
          break;
        case "GET":
        default:
          response = await API.get(uri, { params: data });
          break;
      }
      setLoading(false);
      return { data: response.data, error: null };
    } catch (error: any) {
      setLoading(false);
      return {
        data: null,
        error: error?.response?.data?.message || error.message || error,
      };
    }
  };

  return { fetch, loading };
};
