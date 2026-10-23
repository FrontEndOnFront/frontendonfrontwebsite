# FrontEndonFront Website

Marketing site for FrontEndonFront, a Canadian-owned, full-service digital agency serving BC and Toronto.

Built with Next.js 15 (static export), React 19, TypeScript, Tailwind CSS 4 and React Three Fiber.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home, with the full rail-world loop |
| `/services/` and `/services/[slug]/` | One page per service, each zoomed in on its stop of the loop |
| `/industries/` and `/industries/[slug]/` | Construction, retail, real estate and automotive |
| `/about/`, `/contact/` | Company story, locations, contact form (Formspree) |
| `/sitemap.xml`, `/robots.txt` | Generated at build time |

Content lives in `src/lib/` (`services.ts`, `industries.ts`, `data.ts`, `site.ts`). Adding a service there adds its page,
its nav and footer links, its sitemap entry and its stop on the loop. Give it a station in
`src/components/world/stations.tsx` too.

## The rail world

`src/components/world/` is an Unrailed-inspired voxel island: a ring of biomes, one per service, with a train looping
around the track past an animated station for each service.

- `World.tsx` is the client wrapper: lazy-loads the WebGL scene, overlays the clickable stop labels, handles drag to spin,
  pauses when off-screen and respects `prefers-reduced-motion`.
- `RailWorld.tsx` builds the scene (instanced terrain, track, trains, scenery, camera).
- `stations.tsx` holds the eight animated dioramas, `voxels.tsx` the shared voxel primitives.
- `geometry.ts` is the pure layout math, covered by unit tests.

`<World mode="full" />` shows the whole loop; `<World mode="segment" focus={index} />` shows just one service's section.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
npm run test       # Jest + Testing Library
npm run lint
npm run type-check
```
