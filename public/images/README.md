# Photography

The site ships with cinematic, self-contained placeholders so it looks finished
before any real photos exist. To use real photography, drop files here and pass
the `src` prop to the matching `<Photo>` in the components.

Suggested files (any aspect ratio — they're cropped with `object-fit: cover`):

| Where it appears                 | Component                     | Suggested file           |
| -------------------------------- | ----------------------------- | ------------------------ |
| Hero (inside the doorway)        | `ChurchDoorHero.tsx`          | `hero-couple.jpg`        |
| Story milestones (×4)            | `OurStory.tsx`                | `story-1..4.jpg`         |
| Parallax moments (×3)            | `ParallaxMemories.tsx`        | `parallax-1..3.jpg`      |
| Proposal sequence (×3)           | `ProposalSequence.tsx`        | `proposal-1..3.jpg`      |
| The church                       | `ChurchSection.tsx`           | `church.jpg`             |
| Bride / Groom portraits          | `BrideAndGroom.tsx`           | `bride.jpg`, `groom.jpg` |
| Memory gallery (×5)              | `MemoryGallery.tsx`           | `memory-1..5.jpg`        |
| Reception atmosphere             | `ReceptionSection.tsx`        | `reception.jpg`          |
| Final blessing                   | `FinalBlessing.tsx`           | `farewell.jpg`           |

Example — in `ChurchDoorHero.tsx` change:

```tsx
<Photo src={undefined} alt="..." tone="champagne" ... />
```

to:

```tsx
<Photo src="/images/hero-couple.jpg" alt="..." priority ... />
```

Prefer optimised **WebP/AVIF** at a sensible resolution (~2000px on the long
edge). `next/image` handles responsive sizing and modern formats automatically.
