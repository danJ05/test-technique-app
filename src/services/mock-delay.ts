/** Simule la latence réseau des API mockées. */
export const waitForMockResponse = (delayMs: number = 250): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delayMs));
