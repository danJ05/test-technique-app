import type { Store, StoreListParams, StoreListResponse } from "./types";

const MOCK_STORE_COUNT = 60;
const MOCK_STORE = {
  name: "Angré Djibi 1",
  code: "M0001",
  location: "Abidjan, Cocody",
  commune: "Cocody",
};

const STORES: Store[] = Array.from({ length: MOCK_STORE_COUNT }, (_, index) => ({
  id: `store-${index + 1}`,
  ...MOCK_STORE,
}));

const waitForMockResponse = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 250));

export const storesApiMock = {
  list: async ({ search = "", commune, page, pageSize }: StoreListParams): Promise<StoreListResponse> => {
    await waitForMockResponse();

    const normalizedSearch = search.trim().toLocaleLowerCase("fr");
    const normalizedCommune = commune?.trim().toLocaleLowerCase("fr");
    const filteredStores = STORES.filter(({ name, code, location, commune: storeCommune }) => {
      const matchesSearch = `${name} ${code} ${location}`
        .toLocaleLowerCase("fr")
        .includes(normalizedSearch);
      const matchesCommune = !normalizedCommune
        || storeCommune.toLocaleLowerCase("fr") === normalizedCommune;

      return matchesSearch && matchesCommune;
    });
    const total = filteredStores.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const normalizedPage = Math.min(Math.max(page, 1), totalPages);
    const startIndex = (normalizedPage - 1) * pageSize;

    return {
      items: filteredStores.slice(startIndex, startIndex + pageSize),
      total,
      page: normalizedPage,
      pageSize,
    };
  },
};