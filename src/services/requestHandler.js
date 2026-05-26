import { parseError } from '../utils/errorHandler';
import { setGlobalLoading } from '../contexts/LoadingContext';
import { showGlobalError } from '../contexts/ToastContext';

export const handleRequest = async (asyncFunction) => {
  setGlobalLoading(true);
  try {
    const result = await asyncFunction();
    return result;
  } catch (error) {
    console.warn("Request failed, retrying once...");
    try {
      // Retry once
      const result = await asyncFunction();
      return result;
    } catch (retryError) {
      const message = parseError(retryError);
      showGlobalError(message);
      throw new Error(message);
    }
  } finally {
    setGlobalLoading(false);
  }
};
