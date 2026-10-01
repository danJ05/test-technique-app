import { Plus } from "lucide-react";

import { FilterBar } from "@/shared/components";
import { Button, SearchInput, Select } from "@/shared/ui";

const COMMUNE_OPTIONS = [
  { value: "", label: "Commune" },
  { value: "cocody", label: "Cocody" },
];

interface StoresToolbarProps {
  search: string;
  commune: string;
  onSearchChange: (search: string) => void;
  onCommuneChange: (commune: string) => void;
}

export const StoresToolbar = ({ search, commune, onSearchChange, onCommuneChange }: StoresToolbarProps) => (
  <FilterBar
    title="Magasins"
    className="gap-x-5"
    filters={
      <>
        <SearchInput
          aria-label="Rechercher un magasin"
          placeholder="Nom du magasin, code magasin, Commune"
          value={search}
          onChange={(event) => onSearchChange(event.currentTarget.value)}
          containerClassName="w-full sm:max-w-[320px]"
        />
        <Select
          aria-label="Commune"
          value={commune}
          onChange={onCommuneChange}
          options={COMMUNE_OPTIONS}
          className="w-full sm:w-40"
        />
      </>
    }
    action={
      <Button size="app" leftIcon={<Plus className="size-5" aria-hidden="true" />} className="w-48.5 shrink-0">
        Ajouter un magasin
      </Button>
    }
  />
);