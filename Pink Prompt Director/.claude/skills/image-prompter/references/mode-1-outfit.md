# Mode 1 — Single-image character outfit

Part of the image-prompter skill. Needs `mid-gray-backdrop.md`.

## MODE 1 — SINGLE-IMAGE CHARACTER OUTFIT

**When to use:** The first image of any character/outfit pairing. Locks the full outfit head-to-toe on the character in one clean shot — identity-forward, environment-minimal, single locked output. Runs on Nano Banana Pro or GPT-2 (user picks) — Nano for cheaper high realism (less detail/lighting), GPT-2 for high detail, sharper lighting and more cinematic (heavier on credits).

**Goal:** Single character, face clearly readable, full styling locked head-to-toe, environment minimal so the character is the only subject. The prompt is identity-forward, environment-minimal, lighting-controlled.

**Frame and composition:**
- Framing: Subject centered, weight shifted onto one hip in the cocked-hip model stance, body angled 15–30° from camera, chin slightly tucked or level, eyes to camera or slightly off-camera. Default is full-body for an outfit reference because it shows the whole fit; waist-up or head-to-shoulders only when the user asks. Do not write aspect ratios into the prompt — the aspect goes in the settings table, not the prompt body.
- Background: **Mid-gray seamless studio.** The locked default for all character/outfit work — even neutral mid-gray, no seam line, no gradient. Lowers subject-to-background contrast for cleaner edges and less inherited plastic when the still seeds downstream video. **Exception:** if the user explicitly asks for a clean white card (a finished standalone still to post or hand off), swap to pure white seamless and use the full cinema stack close instead of the lean Rembrandt grade.
- Lighting: Soft cinematic key from camera-left or camera-right (user picks side), very diffused, gentle wrap onto the figure, no harsh shadows, no rim light, no hair light, no kicker — only the gentlest lifted shadow on the off-light side. Skin reads matte and slightly diffused, cinema-placement ready.

**Default expression:** Model face-card neutral, subtle controlled, slight closed-lip smirk at most. Never teeth-showing smile unless the user specifically requests it.

**Canonical Mode 1 prompt structure:**

```
[Visual descriptor of the character — hair, makeup, full wardrobe head-to-toe, jewelry, body markers, all extracted from references or locked from the development phase]. [Pose direction — body angle, weight distribution, hand position, expression].

Mid-gray seamless studio background — even neutral mid-gray, no seam line, no gradient, no falloff to black or white. Relight from scratch overriding any reference lighting: one broad diffused source from camera-[left/right] and slightly above, gentle wrap onto the figure, no harsh shadows, no rim light, no hair light, no kicker, only the gentlest lifted shadow on the off-light side. Skin and fabric read matte and velvety in a low-contrast milky look, no shine, no oily T-zone. Skin renders at its true natural skin tone and the outfit at its true natural color, warmth preserved and natural against the neutral gray, never pale or washed-out or cool-shifted by the background. Real peach fuzz at the jaw and hairline, real fine even pore texture, subsurface scattering reading as semi-translucent biology, real fabric weave and drape, never plastic, never waxy, never harsh. Photographed on a 50mm prime at a wide aperture, natural round bokeh, even sharpness, soft natural film grain. Photographed not generated. [Framing — full body / waist-up / head-to-shoulders].

[Gray is the locked default — use the lean Rembrandt close from `mid-gray-backdrop.md`. If the user explicitly asks for a white card, swap to "Pure white seamless studio background, no gradient, no seam line, perfectly even. Soft cinematic light from camera-[left/right]..." and append the full cinema stack from `cinema-look.md` instead of this lean close.]
```

**Variation strategy when building multiple base references:** When generating a series of single-image base references for the same character (different outfits, different lighting moods, etc.), keep the mid-gray seamless backdrop locked and vary one parameter per shot:

- Pose (cocked-hip front → angled three-quarter → seated → side profile → back-to-camera over-shoulder)
- Framing (full body → waist-up → head-to-shoulders)
- Expression (neutral → smirk → eyes-closed → looking off-frame)
- Lighting direction (key from L → R → top → backlit)

Don't vary face, skin, or core identity markers. Those stay locked.
