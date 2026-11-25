# Mode 2 — 6-panel character sheet

Part of the image-prompter skill. Needs `mid-gray-backdrop.md`.

## MODE 2 — 6-PANEL CHARACTER SHEET (SINGLE 16:9 FRAME)

**When to use:** Only after a single-image base reference has been generated and approved. The 6-panel uses the locked outfit from the base and shows the same character from multiple angles in one image.

**Critical:** Never deliver six separate prompts. Always one prompt → one 16:9 image → six panels in a 3×2 grid.

**Locked settings: GPT-2 · 16:9 · 4K.** No engine choice and no 9:16 alternative — the sheet is always landscape (it arrays six shots side by side), and GPT-2's detail read wins decisively here. **Attach both the outfit base reference AND the face-lock headshot reference** — the headshot keeps the face identity tight across all six panels. This is the crown-jewel asset that feeds the video prompter for character consistency.

**Goal:** A single multi-angle reference asset showing the same character from multiple angles, framings, and detail focuses, all generated in one frame so identity is maximally consistent across the panels.

**Canonical 6-panel layout (3×2 grid, top row left-to-right, bottom row left-to-right):**

1. **Top-left — Full body front:** straight-on neutral stance, full styling readable head-to-boots
2. **Top-center — Side profile close headshot (left side):** tight crop from collarbone up, character's left profile facing screen-right, hair detail, ear and earring detail, jaw and chin geometry readable
3. **Top-right — Full body back:** straight back view, showing hair fall, garment drape, accessory details from behind, footwear from behind
4. **Bottom-left — Side profile close headshot (right side):** tight crop from collarbone up, character's right profile facing screen-left, mirror of Panel 2 from the opposite side
5. **Bottom-center — Front face close headshot:** tight crop from collarbone up, body squared to camera, face filling the frame, eyes to camera, skin texture and facial structure readable
6. **Bottom-right — Detail shot:** ONE locked detail close-up — nails (with ring stack if relevant), key jewelry piece (necklace clasp, earring detail, signature ring), a piercing close-up, a tattoo close-up, OR a held prop (the prop fills the frame with the hand). User picks which detail at the pre-prompt check.

**Variation rule:** If the user requests a different mix of panels (e.g., back of head showing hair clip, midriff close-up showing piercing, boot detail), swap them in by name but keep the 3×2 grid and the single-prompt format. The default layout above is what gets used if the user doesn't specify.

**Frame and composition:**
- Layout: 3×2 grid, equal cells, thin clean white gutters between panels, horizontal sheet orientation
- Each panel composed within its cell as if it were its own shot — no cell should feel like a crop of a wider frame
- Background: same studio backdrop across all six cells (default mid-gray seamless, matching the base reference) for consistency. Only swap to white-across-all-six-panels if the user explicitly asks for a white sheet (see `mid-gray-backdrop.md`).
- Lighting: same single broad diffused key (no rim light, no hair light, no kicker) across all six cells — identity stays locked when lighting is locked
- Do not write aspect ratios into the prompt — the aspect (16:9, locked for sheets) goes in the settings table, not the prompt body

**Canonical Mode 2 prompt structure:**

```
A 6-panel character reference sheet arranged as a 3-column by 2-row grid in a single horizontal frame, separated by thin clean white gutters between panels. Each panel shows the same single character — [full visual descriptor of the character including build, face, hair, makeup, full wardrobe head-to-toe, all accessories, jewelry, body markers, held props].

Panel 1 (top-left): Full body front — [stance description, framing, what's readable].
Panel 2 (top-center): Side profile close headshot, left side — [tight crop from collarbone up, character's left profile facing screen-right, hair and ear and jaw geometry visible].
Panel 3 (top-right): Full body back — [stance, what's visible from behind].
Panel 4 (bottom-left): Side profile close headshot, right side — [tight crop from collarbone up, character's right profile facing screen-left, mirror of Panel 2].
Panel 5 (bottom-center): Front face close headshot — [tight crop from collarbone up, body squared to camera, face filling the frame, eyes to camera].
Panel 6 (bottom-right): Detail shot — [the locked detail close-up: nails / specific jewelry piece / piercing / tattoo / held prop, filling the panel cleanly].

Mid-gray seamless studio backdrop applied uniformly across all six panels — even neutral mid-gray, no seam line, no gradient. Relight from scratch overriding any reference lighting, applied uniformly across all six panels: one broad diffused source from camera-left and slightly above, gentle wrap, no harsh shadows, no rim light, no hair light, no kicker. Skin and fabric read matte and velvety in a low-contrast milky look, rendering at their true natural skin tone and color against the neutral gray, warmth preserved and natural, never cool-shifted or washed-out by the background. Sharp focus across every panel. Real fine even pore texture, peach fuzz at the hairline, subsurface scattering, real fabric weave, soft natural film grain, photographed not generated. Identical character identity locked across all six panels — same face, same skin, same hair, same wardrobe, same accessories, same proportions in every cell.

[Gray is the locked default — use the lean Rembrandt grade from `mid-gray-backdrop.md`. If the user explicitly asks for a white sheet, swap to "Pure white seamless studio backdrop applied uniformly across all six panels" and append the full cinema stack instead of this lean close.]
```

**Critical rules for the 6-panel format:**
- One prompt, one fenced code block, one image output. Never deliver six separate prompts when the user asks for a character sheet.
- Identity description (build, face, hair, wardrobe, accessories) lives in the opening paragraph — described once, applies to all six panels.
- Each panel only describes what's *different* from the locked identity — stance, angle, framing, focus.
- Aspect ratio (16:9, locked) is stated in the settings table, never written into the prompt.
- Lighting and backdrop are always uniform across all six cells.
- Every panel must include the explicit panel position label ("Panel 1 (top-left)", etc.) so GPT-2 can compose the grid correctly.
