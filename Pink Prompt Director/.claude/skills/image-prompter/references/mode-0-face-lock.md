# Mode 0 — Face lock

Part of the image-prompter skill. Needs `mid-gray-backdrop.md` (lean close) and, for GPT-2 builds, `mode-4-detail.md`.

## MODE 0 — FACE LOCK (NEW CHARACTERS ONLY)

**When to use:** Any time a character is being developed from scratch and there is no existing canonical reference image of their face. Run this BEFORE any outfit work, any 6-panel sheet, any scene plate. The face has to be locked as a visual asset first — every downstream prompt anchors to it.

**Goal:** Produce the canonical face reference for the character. Identity only — no outfit considerations beyond a locked neutral baseline top, no environment, no posing direction. Just: a clean, locked face on a mid-gray seamless background (white only on explicit request) with soft lighting that makes the skin read matte and cinema-placement-ready.

**Universal wardrobe lock for Mode 0:** Every face lock prompt — regardless of tool — puts the character in a neutral baseline top:
- **Women:** plain black thin-strap camisole
- **Men:** plain black ribbed tank
No styling, no jewelry, no logos, no graphics. This keeps the face plate identity-pure and gives every downstream Mode 1 outfit build a clean neutral starting reference.

---

### Tool fork — pick one (ask the user first)

Before any prompt, ask the user which engine to use for the face lock. Two options:

> Want to build this in Nano Banana Pro or GPT-2?
> — **Nano Banana Pro (default):** high realism, cheaper — less detail, less accurate lighting.
> — **GPT-2:** high detail, sharper lighting, more cinematic — but heavy on credits.

Mention the GPT-2 credit cost ONCE per conversation, then drop it for the rest of the session.

Wait for the user to pick. Then proceed to the matching step.

---

### Step 0.A — Nano Banana Pro single-pass face lock (default)

**When:** User picks Nano Banana Pro (or doesn't specify and goes with the default recommendation).

**How:** Single-pass Nano Banana Pro generation, no separate plate required. The prompt itself locks identity markers in one shot.

**Pre-prompt check:**

Pre-prompt check — Nano Banana Pro face lock (single-pass):
- **Reference attached:** none — text-only build
- **Character spec:** [identity essentials only — heritage, build, skin, hair color + length + texture, eye shape + color, key identity markers like beauty marks/scars/piercings]
- **Wardrobe:** plain black [camisole / ribbed tank]
- **Backdrop:** mid-gray seamless studio (locked default)
- **Lighting:** soft natural light from camera-[left/right]
- **Framing:** 3:4 headshot, forehead to upper chest, face filling most of the frame

Sound good?

**Canonical Step 0.A prompt structure:**

```
A clean cinema-character-reference headshot, framed from forehead to upper chest with the face filling most of the frame. [Identity essentials — heritage, build, skin tone and finish, hair (color, length, texture), eye shape and color, any key identity markers being locked: piercings with exact position and metal, scars with placement and size, beauty marks with placement]. She wears [a plain black thin-strap camisole / he wears a plain black ribbed tank], no jewelry, no logos, no graphics. Body squared to camera, head level, neutral relaxed expression, eyes to camera, lips closed and relaxed, subtle controlled energy.

Mid-gray seamless studio background — even neutral mid-gray, no seam line, no gradient, no falloff to black or white. Relight from scratch overriding any reference lighting: one broad diffused source from camera-[left/right] and slightly above, a soft triangle of light on the shadow cheek, gentle wrap onto the face, no hard shadow edges, no rim light, no hair light, no kicker. Skin reads matte and velvety — zero shine on forehead, nose bridge, cheekbones, temples, and chin, no oily T-zone — in a low-contrast milky look. Skin renders at its true natural skin tone and wardrobe at its true natural color, warmth preserved and natural against the neutral gray, never pale or washed-out or cool-shifted by the background. Real peach fuzz at the jaw and hairline, real soft fine even pore texture, subsurface scattering reading as semi-translucent biology, never plastic, never waxy AI render, never glass-skin, never harsh — fine flattering texture that keeps the face looking good, no acne, no blemishes, no rough pores. Photographed on a 50mm prime at a wide aperture, natural round bokeh, even sharpness, soft natural film grain. Photographed not generated.

[Gray is the locked default — use the lean Rembrandt close from `mid-gray-backdrop.md`. If the user explicitly asks for a white card instead, swap to "Pure white seamless studio background, no gradient, no seam line, perfectly even. Soft cinematic light from camera-[left/right], very diffused, gentle wrap onto the face, no hard shadow edges, no rim light, no hair light, no kicker. Skin reads matte and slightly diffused, cinematic register ready for placement onto scene plates." and append the full cinema stack from `cinema-look.md` instead of this lean close.]

---

### Step 0.B — GPT-2 single-pass face lock (highest fidelity)

**When:** User explicitly picks GPT-2 and has confirmed the higher credit cost.

**How:** Single-pass GPT-2 generation, chest-up framing only (GPT-2's sweet spot — anything wider loses the fidelity advantage and isn't worth the credit hit).

**Pre-prompt check:**

Pre-prompt check — GPT-2 face lock (single-pass, chest-up only):
- **Reference attached:** none — text-only build
- **Character spec:** [identity essentials only — heritage, build, skin, hair color + length + texture, eye shape + color, key identity markers]
- **Wardrobe:** plain black [camisole / ribbed tank]
- **Backdrop:** mid-gray seamless studio (locked default)
- **Lighting:** soft natural light from camera-[left/right]
- **Framing:** chest-up portrait, face dominant in the frame

Sound good?

**Canonical Step 0.B prompt structure:** Use the GPT-2 prompt grammar from the Mode 4 section for the identity and skin-detail paragraphs, but keep the Step 0.A backdrop and lighting: mid-gray seamless, the lean soft Rembrandt close (one broad diffused source, no rim light, no hair light, no kicker), and the same wardrobe lock. Do not use Mode 4's classical beauty lighting (hair light, underlight bounce) or the full cinema stack here.

---

**What Mode 0 is NOT for:**
- Refining an existing character that already has a canonical reference → not needed, skip to Mode 1
- Outfit design → use Mode 1 (Mode 0's locked black camisole/tank is identity-baseline, not a styled outfit)
- Multi-angle sheets → use Mode 2, but only AFTER Mode 0 + Mode 1 are done

Mode 0 is one-and-done per character. Once the locked 3:4 headshot exists, every future prompt for that character anchors to it.
