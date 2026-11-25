# Stacking modes, lenses, frame rate and runtime

Part of the video-prompter skill.

## STACKING MODES (Multi-World Sequences)

If a single Seedance sequence cuts between two worlds — for example, a music video that intercuts a white void (M2) with a kitchen (M1), or action footage (M3) intercut with performance footage (M4) — write each shot's Camera Capture specs inline in the closing line. Don't blend modes into one averaged grade. The cut between modes is the visual punch; collapsing them kills the contrast.

For multi-shot sequences in the same mode, you can compose one continuous prompt with hard-cut triggers in Movement and a single Camera Capture line with per-shot lens differences inline.

---

## LENS LENGTH GUIDE (across all modes)

- **32mm / 35mm / 40mm:** Wide establishing, full-body, group framing, environmental context
- **50mm / 55mm:** Medium portrait, two-shot, waist-up, dialogue framing
- **75mm:** Tight editorial portrait, single-character isolation, performance close-up
- **85mm / 100mm:** Extreme close-up — eyes, lips, jewelry, fabric texture, surface detail

When in doubt, default to 55mm (M1 / M3 / M4) or 50mm (M2) for medium framing. M5 typically uses the wider end (35→55mm) for environmental reach.

---

## FRAME RATE NOTES

All five modes default to **24fps with 180° shutter** for cinema-standard motion blur.

Slow-motion beats (impact, hair whip, fabric on a hit, water splash, weapon recoil): specify inside the Camera Capture line — `intercut 96fps high-speed slow-motion at [moment] holding 180° shutter.` Keep the base frame rate at 24fps.

---

## RUNTIME & PER-SHOT TIMING

**Total runtime** is stated in three places: title line above the code block, Frame Map block (for multi-shot sequences with per-shot timing), and the closing Camera Capture line. All three must match.

**Always ask runtime — never default.** If the user hasn't specified runtime, ask in the pre-prompt confirmation step.

**Shot complexity guidance:**
- **4–8 seconds** — one strong character action, single locked composition
- **8–12 seconds** — one action plus reveal or hold, optional micro-shift in composition
- **12–15 seconds** — 2–3 simple beats with hard cuts inside the prompt
- **Complex multi-action sequences** — split into separate prompts

**Per-shot timing for multi-cut sequences:** when a single Seedance prompt contains more than one shot stitched with hard cuts, label each shot inline in the Frame Map and Movement blocks with its time range. The per-shot timing must add up to the total runtime stated in Camera Capture and the title.
