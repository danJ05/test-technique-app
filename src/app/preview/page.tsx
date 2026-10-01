"use client";

import { useState } from "react";
import { List, Pencil, Plus, RefreshCw, Repeat, UserX } from "lucide-react";

import {
  Amount,
  AppHeader,
  AuthCard,
  BirdIllustration,
  Breadcrumb,
  ChartLegend,
  DataTable,
  DateRangePicker,
  DonutChart,
  Drawer,
  DrawerSection,
  FilterBar,
  InfoItem,
  MaskedValue,
  PageHeader,
  Pagination,
  StoreCard,
  Timeline,
  type DataTableColumn,
} from "@/shared/components";
import { APP_NAV_ITEMS } from "@/shared/config/app-navigation";
import {
  Badge,
  Button,
  Card,
  FilterChip,
  FormField,
  IconButton,
  Input,
  PasswordInput,
  SearchInput,
  SegmentedControl,
  Select,
} from "@/shared/ui";
import type { DateRange } from "@/shared/utils/date";

interface CashierRow {
  id: string;
  user: string;
  key: string;
  date: string;
  active: boolean;
}

const ROWS: CashierRow[] = [
  { id: "1", user: "OwenJaphet01", key: "1234", date: "20/01/2025, 10:20", active: true },
  { id: "2", user: "OwenJaphet02", key: "5678", date: "20/01/2025, 10:20", active: true },
  { id: "3", user: "OwenJaphet03", key: "9012", date: "20/01/2025, 10:20", active: false },
];

const COLUMNS: DataTableColumn<CashierRow>[] = [
  { key: "user", header: "Utilisateur", cell: (row) => <span className="font-bold">{row.user}</span> },
  { key: "key", header: "Clé d'accès", cell: (row) => <MaskedValue value={row.key} label="la clé d'accès" /> },
  { key: "date", header: "Date d'affectation", cell: (row) => row.date },
  {
    key: "status",
    header: "Statut",
    cell: (row) => <Badge variant={row.active ? "success" : "neutral"}>{row.active ? "Actif" : "Bloqué"}</Badge>,
  },
  {
    key: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-1">
        <IconButton aria-label="Modifier" tooltip="Modifier" icon={<Pencil className="size-4" aria-hidden="true" />} />
        <IconButton aria-label="Réinitialiser" icon={<Repeat className="size-4" aria-hidden="true" />} />
        <IconButton aria-label="Historique" icon={<List className="size-4" aria-hidden="true" />} />
        <IconButton aria-label="Bloquer" icon={<UserX className="size-4" aria-hidden="true" />} />
      </div>
    ),
  },
];

export default function PreviewPage() {
  const [tab, setTab] = useState<"transactions" | "caissiers">("caissiers");
  const [status, setStatus] = useState<string>("all");
  const [range, setRange] = useState<DateRange>({ from: null, to: null });
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 p-4 sm:p-8">
      <div>
        <AppHeader items={APP_NAV_ITEMS} />
        <Breadcrumb items={[{ label: "Magasins", href: "/preview" }, { label: "Détails" }]} />
      </div>

      <PageHeader title="Détails Magasin" backHref="/" />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="flex min-w-0 flex-col gap-6">
          <Card className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <dl className="grid grid-cols-2 gap-x-10 gap-y-4 md:grid-cols-3">
              <InfoItem label="Nom du magasin" value="Angré Djibi 1" />
              <InfoItem label="Manager" value="Emmanuel GUIEBI" />
              <InfoItem label="Nombre de Caissiers" value="07" />
              <InfoItem label="Localisation" value="Abidjan, Cocody" />
              <InfoItem label="Responsable Caisse" value="Ismael DIOMANDE" />
              <InfoItem label="Nombre de Transaction" value="1253" />
            </dl>
            <div className="flex items-center gap-6">
              <DonutChart
                sizeClassName="size-28"
                segments={[
                  { label: "Rendu monnaie", value: 75, strokeClassName: "stroke-primary" },
                  { label: "Paiement course", value: 25, strokeClassName: "stroke-success" },
                ]}
              />
              <ChartLegend
                items={[
                  { label: "Rendu monnaie", dotClassName: "bg-primary" },
                  { label: "Paiement course", dotClassName: "bg-success" },
                ]}
              />
            </div>
          </Card>

          <Card className="flex flex-col gap-6 px-0 sm:px-0">
            <div className="flex flex-col gap-6 px-5 sm:px-6">
              <SegmentedControl
                aria-label="Onglets du magasin"
                value={tab}
                onChange={setTab}
                items={[
                  { value: "transactions", label: "Transactions" },
                  { value: "caissiers", label: "Caissiers" },
                ]}
              />
              <FilterBar
                title="Caissiers"
                filters={
                  <>
                    <SearchInput aria-label="Rechercher un caissier" placeholder="Nom d'utilisateur" containerClassName="sm:max-w-[280px]" />
                    {[
                      { value: "all", label: "Tous" },
                      { value: "active", label: "Actif" },
                      { value: "blocked", label: "Bloqué" },
                    ].map((chip) => (
                      <FilterChip key={chip.value} label={chip.label} isActive={status === chip.value} onClick={() => setStatus(chip.value)} />
                    ))}
                    <DateRangePicker aria-label="Période" value={range} onChange={setRange} />
                    <IconButton aria-label="Actualiser" icon={<RefreshCw className="size-4" aria-hidden="true" />} />
                  </>
                }
                action={<Button size="app">Ajouter un caissier</Button>}
              />
            </div>
            <DataTable caption="Liste des caissiers" columns={COLUMNS} rows={ROWS} getRowKey={(row) => row.id} selectedRowKey="2" />
          </Card>
        </div>

        {isDrawerOpen ? (
          <Drawer title="OwenJaphet01" onClose={() => setIsDrawerOpen(false)}>
            <DrawerSection title="Historique magasin">
              <Timeline
                items={[
                  { id: "1", title: "Zone 4, Abidjan", description: "Depuis le 20/01/2025", action: <Button variant="secondary" size="xs">Voir l&apos;activité</Button> },
                  { id: "2", title: "Angré 8e Tranche", description: "Du 18/04/2024 au 30/08/2025", action: <Button variant="secondary" size="xs">Voir l&apos;activité</Button> },
                ]}
              />
            </DrawerSection>
            <DrawerSection title="Dernières transactions">
              <ul className="flex flex-col gap-3 text-sm font-bold">
                <li className="flex justify-between">Paiement course <Amount value={2500} /></li>
                <li className="flex justify-between">Rendu monnaie <Amount value={-220} /></li>
              </ul>
            </DrawerSection>
          </Drawer>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setIsDrawerOpen(true)}>
            Ouvrir le panneau
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <h2 className="text-[32px] font-bold">Magasins</h2>
        <SearchInput aria-label="Rechercher un magasin" placeholder="Nom du magasin, code magasin, Commune" containerClassName="max-w-[320px]" />
        <Select
          aria-label="Commune"
          placeholder="Commune"
          options={[
            { value: "cocody", label: "Cocody" },
            { value: "plateau", label: "Plateau" },
            { value: "yopougon", label: "Yopougon" },
          ]}
        />
        <Select
          aria-label="Période"
          variant="compact"
          defaultValue="30d"
          options={[
            { value: "today", label: "Aujourd'hui" },
            { value: "7d", label: "7 derniers jours" },
            { value: "30d", label: "30 derniers jours" },
            { value: "year", label: "Cette année" },
          ]}
        />
        <Button size="app" leftIcon={<Plus className="size-5" aria-hidden="true" />} className="ml-auto">
          Ajouter un magasin
        </Button>
        <Button variant="outline" size="sm">Tous les magasins &gt;</Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StoreCard name="Angré Djibi 1" location="Abidjan, Cocody" href="/preview" isHighlighted />
        {Array.from({ length: 4 }, (_, index) => (
          <StoreCard key={index} name="Angré Djibi 1" code="M0001" location="Abidjan, Cocody" href="/preview" />
        ))}
      </div>

      <Pagination currentPage={1} totalPages={4} pathname="/preview" />

      <Card className="flex flex-col items-center gap-4 sm:flex-row sm:justify-around">
        <DonutChart
          sizeClassName="size-56"
          thickness={9}
          centerValue="9364"
          centerLabel="Transactions"
          segments={[
            { label: "Rendu monnaie", value: 80, strokeClassName: "stroke-primary" },
            { label: "Paiement course", value: 20, strokeClassName: "stroke-success" },
          ]}
        />
        <div className="flex flex-col gap-2">
          <Amount value={220} colored />
          <Amount value={-220} />
        </div>
      </Card>

      <div className="relative flex min-h-[760px] items-center justify-center overflow-hidden rounded-card bg-primary p-4">
        <BirdIllustration className="absolute left-1/2 top-1/2 w-[1300px] max-w-none -translate-x-1/2 -translate-y-1/2" />
        <AuthCard title="Connexion" description="Saisissez vos identifiants pour vous connecter">
          <form className="flex flex-1 flex-col gap-4">
            <FormField id="login" label="Identifiant">
              <Input id="login" />
            </FormField>
            <FormField id="password" label="Mot de passe" error="Mot de passe incorrect">
              <PasswordInput id="password" hasError aria-describedby="password-error" />
            </FormField>
            <div className="mt-auto flex justify-center pt-8">
              <Button size="auth" type="submit">Se connecter</Button>
            </div>
          </form>
        </AuthCard>
      </div>
    </div>
  );
}
