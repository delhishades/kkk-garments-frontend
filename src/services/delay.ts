// Simulates network latency for mock services so loading states are visible.
export const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));
