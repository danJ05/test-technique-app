# Auchan Back-office

Application Next.js pour le back-office Auchan. L’authentification est actuellement simulée afin de tester l’interface en attendant le backend.

## Démarrage

Prérequis : Node.js 20.9 ou supérieur et pnpm 11.9.

```bash
pnpm install
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000). La racine redirige vers `/login`.

## Identifiants de test

Ces identifiants ne sont plus affichés sur le formulaire de connexion. Utilisez-les pour tester l’application :

| Champ | Valeur |
| --- | --- |
| Identifiant | `demo` |
| Mot de passe | `Demo1234!` |
| Code OTP (mot de passe oublié) | `1234` |

## Parcours de démonstration

- Connexion : saisir les identifiants de test ci-dessus. Une connexion réussie crée un cookie de démonstration valable huit heures, redirige vers `/dashboard` et affiche un toast de bienvenue.
- Erreurs de connexion : `réseau` simule une erreur réseau et `serveur` une erreur serveur. Toute autre combinaison échoue.
- Mot de passe oublié : saisir une adresse email valide, puis utiliser le code OTP `1234` pour continuer vers `/reset-password`.

Ces données et le cookie sont réservés à la démonstration. Le cookie permet au proxy de protéger `/dashboard` et `/store` dans le parcours de test, mais ne constitue pas une session backend ni une protection adaptée à des données réelles.

## Flux d’architecture

Chaque feature suit le même trajet, qu’il s’agisse d’authentification ou d’une future fonctionnalité métier :

```text
Route (Server Component)
	→ Container (composition et orchestration)
	→ Vue de feature (présentation et interactions)
	→ Hook (état métier et requête ou mutation TanStack Query)
	→ Service (contrat et accès aux données)
	→ API mock ou API réelle
	→ résultat ou erreur remonté vers le container et la vue
```

React Hook Form gère les champs; Zod valide les valeurs avant l’appel au service. Le container relie la vue aux hooks et décide des transitions ou retours d’état. Les vues restent présentatives, tandis que `shared/ui` fournit les contrôles réutilisables. Le service masque à l’interface si la réponse vient d’un mock ou du backend.

Le `QueryClientProvider` est partagé par l’application via `src/app/providers.tsx`. Les features métier, comme la liste des magasins, gardent leurs vues et hooks dans `src/features/` et leur contrat de données et adaptateur dans `src/services/`.

## Vérifications

```bash
pnpm lint
pnpm build
pnpm start
```

`pnpm start` lance la version de production après un build.
