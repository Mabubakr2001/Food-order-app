import * as React from "react";
import CartContext from "../store/cart-context";

const { useCallback, useState, useContext } = React;

export default function useHttp() {
  const cartContext = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(
    async ({ requestConfig, applyData = undefined }) => {
      setIsLoading(true);
      const { url, method, headers, body } = requestConfig;
      try {
        const response = await fetch(url, {
          method: method || "GET",
          headers: headers || {},
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok)
          throw new Error(
            `Something went wrong (${response.status}) ${response.statusText}. Check your URL!`
          );

        const data = await response.json();

        setIsLoading(false);
        applyData && applyData(data);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setError(error.message);
      }
    },
    []
  );

  return {
    sendRequest,
    isLoading,
    error,
  };
}
