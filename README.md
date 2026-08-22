# Nigeria Governance Scorecard

A frontend-only, statically exported Next.js build of the stakeholder PRD.
Every backend concept in the PRD (aggregation queries, Supabase tables,
server-side pulse analytics, transcript storage) is represented here as a
believable, fully working frontend mock, structured so a real API can be
dropped in later with minimal refactoring.

## Stack

Next.js 15 (App Router, static export) · TypeScript · Tailwind CSS v4 ·
Framer Motion · lucide-react · self-hosted Fraunces / Inter / IBM Plex Mono.

## The two interface modes

The PRD's core mechanic: a single master toggle (`PersonaToggle`, in the
header and in Settings) switches the entire application between:

- **Taxpayer** — light, serif-driven editorial register. Formal question
  phrasing, list-based leader search.
- **Agbado-Cruise** — dark, bolder accent colour, street-slang microcopy,
  image-grid leader picker. Same underlying data, different voice.

