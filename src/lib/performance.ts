import { toast } from "sonner";

// Limits input characters. 1 million chars is roughly 1MB of text.
export const MAX_INPUT_LENGTH = 5000000; // 5 Million Characters

export function validatePerformanceLimit(text: string, title: string = "Input too large"): boolean {
  if (text.length > MAX_INPUT_LENGTH) {
    toast.error(title, {
      description: `Your input is ${ (text.length / 1000000).toFixed(2) }M characters. For performance and browser limits, please keep it under 5M chars.`,
    });
    return false;
  }
  return true;
}

/**
 * Utility to debounce heavily intensive UI tasks.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  waitFor: number
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
}
