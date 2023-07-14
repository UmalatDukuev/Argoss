import { useState } from 'react';

export const useFetching = (callback: () => Promise<void>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string>('');

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setIsError(e.message);
      } else {
        setIsError(String('Error'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, isError] as const;
};
