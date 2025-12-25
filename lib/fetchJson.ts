interface FetchError extends Error {
  response?: Response;
  data?: { message?: string };
}

export default async function fetcher<T = unknown>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  try {
    const response = await fetch(input, init);

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    // console.log(JSON.stringify(data));
    const error: FetchError = new Error(response?.statusText || data?.message);
    error.response = response;
    error.data = data;
    throw error;
  } catch (error) {
    const fetchError = error as FetchError;
    if (!fetchError.data) {
      fetchError.data = { message: fetchError.message };
    }
    throw fetchError;
  }
}
