# Mode 5 — Outfit replacement (two-reference swap)

Part of the image-prompter skill. Subject to the Adults-only and Real-people rules in SKILL.md.

## MODE 5 — OUTFIT REPLACEMENT (NANO BANANA PRO TWO-REFERENCE SWAP)

**When to use:** When the user wants to take an outfit and pose from one image and apply it to a different character. The outfit reference image has the wardrobe, styling, footwear, accessories, and body pose locked in. The character reference image has the face, bone structure, body type, skin tone, and hair locked in. The output combines them — the character from the second image now wears the outfit and holds the pose from the first image.

Trigger phrases include: "outfit replacement," "outfit swap," "put [character] in this outfit," "swap the face," "put this character in that fit," "replace the model with [character] wearing [outfit]," or any request that involves combining a wardrobe/pose reference with a separate character reference.

**Goal:** Maximum identity transfer of the character (from @image2) onto the outfit and pose (from @image1) with zero alteration to either side — the outfit stays exactly as shown, the character's identity stays exactly as shown, only the body underneath the outfit changes to match the new character.

**Reference attachment order (CRITICAL):**
- **@image1 = outfit reference** — the image containing the outfit, styling, footwear, accessories, and pose to keep
- **@image2 = character reference** — the image containing the face, bone structure, body type, skin tone, and hair to apply

This order is fixed. Do not swap. The prompt is written around this exact mapping and reversing it will break the swap.

**Pre-prompt confirmation rule applies.** Even though the prompt itself is short and locked, the user should confirm:
- Which reference is the outfit/pose source
- Which reference is the character/identity source
- That both references are uploaded and visible in chat

Use the standard pre-prompt check format — references first, then the two roles, then run.

**Canonical Mode 5 prompt (LOCKED — do not modify):**

```
Replace the character in @image1 with the character in @image2. Keep the outfit and pose from @image1 exactly. Match the face, bone structure, body type, skin tone, and hair from @image2. Clean mid-gray seamless studio background, even neutral mid-gray with no seam line, soft large-source studio lighting, skin and outfit rendering at their true natural tone against the neutral gray, natural film grain, full body framing.
```

**Why this prompt is locked:** Mode 5 does not use the cinema stack. The two reference images carry the photographic register on their own — adding texture stack language on top of a swap operation creates conflicting instructions and degrades the identity transfer. The lean prompt structure is the entire point of this mode. Trust the references.

**Background and lighting language is also locked.** The locked prompt outputs to a clean mid-gray seamless studio with soft large-source lighting — this is the canonical neutral output for character/outfit reference assets (white seamless only if the user explicitly asks for a white card). If the user wants the swap output dropped into a different environment, that becomes a Mode 3 scene plate built on top of the Mode 5 output (run Mode 5 first to produce the locked base, then Mode 3 to place it in the scene).

**Per-character or per-IP modifiers:** None. Mode 5 is character-and-IP-agnostic. The prompt does not name characters, does not specify nationality, does not adjust language per group or project. The two reference images carry all of the identity load. The skill ships the locked prompt unchanged regardless of what the character or outfit is.

**What Mode 5 is NOT for:**
- Building a new outfit from scratch on a locked character → use Mode 1 (single-image character outfit)
- Generating multiple angles of a locked character in a locked outfit → use Mode 2 (6-panel character sheet)
- Placing a character in a cinematic environment → use Mode 6 (character-in-scene), or Mode 3 for a pure environment plate
- Detail face shots → use Mode 4 (GPT-2)

Mode 5 is the single-purpose tool for: *here is an outfit on a model I don't care about, and here is the character I do care about, give me the character in that outfit.*
