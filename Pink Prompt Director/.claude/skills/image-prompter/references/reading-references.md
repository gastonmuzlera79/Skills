# Reading references and keeping prompts lean

Part of the image-prompter skill. Read for every prompt, especially when the user has attached images.

## LEAN PROMPTS WHEN REFERENCES ARE ATTACHED

When the user attaches reference images (character canonical sheets, wardrobe references, environment plates, car interior plates), those references carry the visual identity load. The prompt does NOT need to re-describe what the references already show. Heavy visual description on top of strong references creates double-weight prompts that dilute the photographic direction Nano Banana Pro / GPT-2 actually need from the text.

**The new structure for every prompt this skill produces:**

**1. Identify subjects by short, distinguishing visual descriptors only.**
- "the woman with platinum-blonde hair in the white unitard" — not a paragraph describing her face structure, skin texture, hair waves, lash length, lip shape, brow arch, body type, posture, makeup
- "the cream pearl coupe interior" — not a paragraph describing every dash gauge, knob, charm, harness, switch
- One distinguishing visual handle per subject is enough — the reference image carries the rest

**2. Put the load on what the prompt UNIQUELY needs to communicate:**
- Composition and framing (where the subject is in the frame, what's in foreground/background, what the camera angle is)
- Pose, expression, what bodies and hands are doing
- Light direction and quality (where the light is coming from, how it falls on the subject)
- Wardrobe or styling SPECIFIC TO THIS PLATE that's not in the existing references
- The cinema stack at the end

**3. Drop the redundant identity descriptions entirely UNLESS the reference is ambiguous.**
- If the user attached the character canonical, the prompt does not need to re-describe face structure, body proportions, skin tone, eye shape. Mention them only when something specific to this plate requires it
- Trust the references to carry identity. The prompt's job is to tell Nano Banana Pro what to DO with the identity in this specific shot

**4. When in doubt, lean shorter.**
- A 2500-character Nano Banana Pro prompt with strong references beats a 5000-character prompt every time
- Nano Banana Pro reads the front of the prompt most heavily; loading the front with composition + pose + light gets better results than burying those decisions under visual description
- The references show the model what things LOOK like. The prompt tells the model how to FRAME them.

**Lean prompt rule of thumb:** if a sentence in the prompt re-describes something that's already visible in an attached reference, cut it unless it's load-bearing for the composition or action.

## READING REFERENCE IMAGES

When the user uploads reference images, extract everything visible in the frame by **visual description only** — never use names, never invent details that aren't in the image.

**For each character in the reference, capture:**

- **Hair:** color (every nuance — platinum, jet black with cool undertone, rose-pink, burgundy, ash brown, dirty blonde, etc.), length, style, texture (straight, wavy, curly, coily), parting, any styling (slicked, blown out, flat-ironed, braided, bunned, ponytail, bangs — and which kind of bangs), accessories (clips, bows, ribbons, caps, bandanas, headbands)
- **Makeup:** skin finish (matte, dewy, glass-skin, bare), foundation/coverage register, brow shape and density, eye treatment (cat-eye liner, smoky, sharp graphic, soft bare, glitter, colored), lashes, lip (gloss, matte, gradient, color, fullness), cheek (flush, contour, highlight), any face jewelry, freckles or beauty marks **only if visible in the reference** (do not invent)
- **Wardrobe:** every garment top to bottom — fabric, color, fit (cropped, oversized, fitted, baggy), structural details (cutouts, keyholes, ribbing, ribbed cotton, knit, denim wash, leather finish, mesh, latex, silk), neckline, sleeve length, hem position, layering, branding details (described generically — "three-stripe athletic sneakers" not the brand name)
- **Jewelry & accessories:** every piece — earring style, necklace count and material, rings, bracelets, body chains, belts, bag, sunglasses, watch
- **Body markers:** piercings (only if visible), tattoos (only if visible), nail length and color, distinguishing features
- **Pose and energy:** body angle, weight distribution, hand position, expression register

**Naming rule (CRITICAL).** Never use proper names in the prompt output. Refer to characters by visual description: "the rose-pink haired woman in the cropped white ribbed tank," "the figure in the platinum mech suit," "the man in the long charcoal wool coat." The model does not know names. Visual descriptors survive across prompts; names do not.

**Brand name rule (CRITICAL).** Never use real brand names or protected IP in the prompt output. Use generic visual descriptors — "black three-stripe athletic sneakers" not specific brand names, "wide-angle action camera" not specific product names. Internal chat with the user can reference brands by name; the prompt output must be brand-neutral.

**Age-blind rule.** Never describe characters by age in the prompt text (a wording rule only; the Adults-only rule in UNIVERSAL PROMPT RULES is the actual check). Avoid: *boy, girl, child, kid, young, teen, little, middle-aged, elderly, old.* Describe by role, build, and clothing — "the figure in the wool cloak," "the woman in the cropped tank."

**No-invention rule.** If the user gives you a reference image and asks for the same character in a new scene, do not invent wardrobe or styling details that aren't in the image or specified in the request. If something is needed but not specified (e.g., a new outfit for a new scene), ask before composing.
