# RannaKori premium redesign

## Direction
Apply the selected **Saffron Spice Minimalist** composition across the product, while replacing its generic sample content with RannaKori’s Bengali-first experience. Use the requested ivory, leaf green, turmeric, terracotta, ink, and off-white palette; Hind Siliguri for interface copy and Tiro Bangla only for editorial headings.

## App shell and foundations
- Define semantic light/dark color tokens, warmer shadows, 18–24px surface radii, strong focus rings, and 180–280ms motion with reduced-motion fallbacks.
- Build one responsive shell: four-item glass bottom navigation on mobile and a fixed left navigation rail on desktop, with a content width up to 1280px.
- Standardize Bengali labels, 44px minimum controls, page headings, empty states, dialogs, and sticky trays.

## Screens
- **Home:** lead with “আজ কী রান্না করবেন?”, inline search and filtered results, pantry summary, popular ingredient combinations, Bengali categories, recent/popular ingredients, full catalogue, and a non-overlapping selected-item tray with the requested CTA.
- **Pantry:** illustrated empty state, categorized pantry display, common-essentials shortcut, and a searchable full-height mobile sheet / two-panel desktop dialog with a separate selected list.
- **Recipe:** three-stage loading indicator with skeleton and rotating tips; large ingredient-driven food visual, expressive metadata badges, alternative previews, checkable ingredients, substitution/shopping card, and a desktop two-column layout with sticky instructions.
- **Cooking mode:** full-screen single-step experience with relevant ingredients, circular timer, pause/reset, optional wake lock and speech controls, strong progress, thumb-friendly navigation, completion celebration, and history saving.
- **Favorites and history:** crafted empty illustrations and calls to action; populated cards with ingredient imagery, timing, match context, and saved/last-viewed dates.
- **Authentication:** branded food-photo panel on desktop and focused mobile card, with clear sign-in benefits; preserve email, Google, reset, and signup behavior.
- **Settings:** working controls for language, units, spice, diet, theme, and reduced motion; remove placeholder text.
- **About:** brand story, workflow, principles, creator, and feedback action.

## Technical details
- Preserve all routes, local data stores, authentication, AI function invocation, recipe validation, favorites, history, pantry freshness, timers, substitutions, and lazy loading.
- Use existing authentic ingredient assets for visual content; derive recipe imagery from selected ingredients instead of introducing AI-generated ingredient imagery.
- Keep preferences local where no account persistence exists, apply theme/reduced-motion immediately, and avoid backend/schema changes.
- Update app metadata and remove Lovable branding hooks/configuration without changing deployment behavior.

## Verification
- Check the home, pantry, recipe, cooking, favorites/history, auth, settings, and about flows at mobile and desktop sizes.
- Confirm selection trays and navigation never overlap, all controls remain reachable, reduced motion works, and existing tests still pass.
