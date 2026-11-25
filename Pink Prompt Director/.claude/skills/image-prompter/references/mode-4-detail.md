# Mode 4 — GPT-2 detail face shot

Part of the image-prompter skill. Needs `mid-gray-backdrop.md` and the full cinema stack from `cinema-look.md`.

## MODE 4 — GPT-2 DETAIL FACE SHOT

**When to use:** Only when the user explicitly asks for a chest-up portrait, face detail shot, or close-up where face/skin/eye fidelity matters most. Never suggested proactively for any other shot type.

**Gating behavior:**
- Wait for the user to ask for a detail/face/chest-up shot.
- Then ask: "want to run this on GPT-2 for the higher-fidelity face read? heads-up — GPT-2 uses more credits than Nano Banana Pro." (Mention the credit cost only the first time per conversation. After that, just confirm "want this on GPT-2?")
- Wait for the green light. Then run the standard pre-prompt confirmation. Then deliver the prompt.

**Goal:** Maximum face fidelity. Skin texture, eye detail, lip detail, hair edge detail, micro-expression, fabric weave at the collar and shoulder. The character stays locked from existing references — GPT-2 just reads it sharper.

**Frame and composition:**
- Framing: chest-up, shoulders-up, or face-only (forehead to collarbone)
- Background: mid-gray seamless studio (locked default, matches base references) OR soft moody studio backdrop if the user wants a more cinematic register — white seamless only on explicit request
- Lighting: classical beauty lighting — soft key from slightly above and camera-left, soft fill at chest level from camera-right, subtle hair light behind, soft underlight bounce from below to lift eye sockets
- Do not write aspect ratios into the prompt — the aspect goes in the settings table (3:4 default; offer 9:16 or 4:5 on request), not the prompt body.

**Canonical Mode 4 (GPT-2) prompt structure:**

```
[Visual descriptor of the character — hair, makeup, wardrobe visible in frame from the chest up, jewelry visible at collar and ears, eye color and detail, lip detail, skin finish]. [Pose direction — head angle, shoulder angle, expression register].

[Background — mid-gray seamless studio (locked default) OR specified moody backdrop]. Classical beauty lighting — soft key from slightly above and camera-left at 35 degrees, soft fill at chest level from camera-right, subtle hair light behind defining the crown, soft underlight bounce lifting the eye sockets. [Framing — chest-up portrait / shoulders-up / face-only forehead-to-collarbone].

Extreme face fidelity. Real skin texture with visible pores, fine peach fuzz catching light along the jawline and upper lip, subtle subsurface scattering on the nose bridge cheeks and ears, micro-expression detail in the eyes and mouth corners, individual lash detail, real moisture and reflection in the iris with visible iris pattern, real lip texture with subtle natural lip lines, hair rendered strand by strand at the hairline with visible baby hairs and flyaways, fabric weave visible at the collar and shoulder.

[The cinema stack].
```

**Why GPT-2 for these shots:** Nano Banana Pro is excellent for full-body, multi-panel, and scene work. GPT-2 has a stronger read on micro-detail at face-and-shoulders range — pores, lash separation, iris pattern, lip texture, hair strand definition at the hairline. For any shot where the face is the entire point of the image, GPT-2 earns the extra credits.
