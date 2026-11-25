# Camera Capture and the five cinema modes

Part of the video-prompter skill. The single Camera Capture line closes every prompt; use the section for the chosen mode.

## CAMERA CAPTURE

The Camera Capture is the single closing line of every Seedance prompt. It contains body, lens, filter, movement, stock, grade, frame rate, and runtime — all in one trimmed paragraph.

**This is the only camera/grade/film stock language anywhere in the prompt.** No discrete `Camera:` block in the middle of the body. No double specification. The Camera Capture line carries it all.

**Default camera energy is handheld with breath, drift, and organic operator movement** — even in editorial / quiet / observational moments. The lived-in operator presence is part of the cinema register.

**Locked-off tripod is OPT-IN ONLY in M1, M3 and M4** (M2 and M5 default to locked or a slow push, per the mode table) — used only when the user explicitly requests "locked off," "tripod," "no camera movement," "static," "still camera," or names a specific shot type that requires it (overhead surveillance plate, surgical observation, security cam aesthetic, formal portrait studio plate).

---

## MODE-SELECT TABLE

| Mode | Use when scene is... | Capture | Lens | Movement | Diffusion | Grade |
|---|---|---|---|---|---|---|
| **M1 — Narrative** | Real-world dramatic — streets, kitchens, cars, bars, interiors, exterior locations. Anywhere lived-in. | Wide-latitude cinema capture | Vintage 2x anamorphic character, 40/55/75/100mm, wide aperture — oval bokeh, soft frame-edge falloff | Handheld with operator breath | Light diffusion bloom softening highlights | Color-negative daylight film rendition, fine 35mm grain, teal-amber |
| **M2 — Studio / Editorial** | White void, clean studio, hyperpop saturated set, fashion film, editorial portrait, performance-on-set | Wide-latitude cinema capture | Clean spherical character, 32/50/75/100mm, wide aperture — natural round bokeh, even sharpness | Locked tripod with optional slow push | Mild diffusion bloom; intentional highlight bloom on chrome/rhinestone | Saturated editorial, warm-retained blacks, fine grain |
| **M3 — Action / Combat** | Combat, chase, stunts, war, mech battles, alien encounters, debris, smoke, dust | Wide-latitude cinema capture | Vintage 2x anamorphic character, 40/55/75/100mm, wide aperture — oval bokeh, soft edge falloff | Handheld and shaky throughout, no stabilized shots | Light diffusion bloom softening highlights | Color-negative film rendition, heavier low-light grain, palette per scene, dusty haze |
| **M4 — Performance / Concert** | Stadium, arena, stage, jumbotron, lightstick crowd, festival pit | Wide-latitude cinema capture | Vintage 2x anamorphic character, 40/55/75/100mm, wide aperture — oval bokeh, horizontal streak flares on stage lights | Mixed handheld pit-photographer and orbital, hard cuts | Light diffusion bloom softening highlights | Color-negative film rendition, fine grain, desaturated cool with warm bloom, stage color cast |
| **M5 — Atmospheric / Empty** | Abandoned environments, no-humans plates, landscapes, weather pieces, mood/world establishing shots | Wide-latitude cinema capture | Vintage 2x anamorphic character, 35→85mm push range, wide aperture — oval bokeh, soft edge falloff | Locked-off or extremely slow push-in / pull-back | Light diffusion bloom softening highlights | Color-negative film rendition, fine grain, palette-driven (specify hex per scene) |

---

## MODE 1 — NARRATIVE (Real-World, Lived-In)

**When to use:** Real-world dramatic scenes. Streets, apartments, kitchens, cars, bars, diners, locker rooms, exterior locations, anywhere someone could plausibly walk into and shoot.

**Camera Capture line (drop in at end of any M1 prompt):**

```
Camera Capture: wide-latitude cinema capture, vintage [XX]mm 2x anamorphic character at a wide aperture — oval bokeh, soft frame-edge falloff — light diffusion bloom softening highlights, handheld with natural operator breath, color-negative daylight film rendition with fine 35mm grain, teal-amber grade, shallow depth of field, 24fps 180° shutter, [XX] seconds.
```

Replace `[XX]` with lens length (40mm wide, 55mm medium, 75mm tight, 100mm close-up) and the runtime.

**Multi-shot variant:**

```
Camera Capture: Shot 1 — wide-latitude cinema capture, vintage 40mm 2x anamorphic character at a wide aperture, light diffusion bloom softening highlights, handheld with natural operator breath. Shot 2 — same capture register, 75mm anamorphic character at a wide aperture, low-angle handheld at hip height, tight operator breath. Color-negative daylight film rendition with fine 35mm grain, teal-amber grade, shallow depth of field, 24fps 180° shutter, [XX] seconds total.
```

---

## MODE 2 — STUDIO / EDITORIAL (Crafted, Not Photographed)

**When to use:** White void, clean studio sets, editorial portraits, hyperpop saturated worlds, fashion film, performance-on-set, any scene that is *crafted* rather than *photographed.*

**Lens guide:**
- 32mm — full-body wide on the void / group framing
- 50mm — medium portrait
- 75mm — tight editorial face cuts
- 100mm — extreme close-ups (lips, eyes, jewelry, fabric)

**Camera Capture line:**

```
Camera Capture: wide-latitude cinema capture, clean spherical [XX]mm character at a wide aperture — natural round bokeh, even sharpness — mild diffusion bloom, locked tripod with optional slow push-in, saturated editorial grade, fine grain, warm-retained blacks, 24fps 180° shutter, [XX] seconds.
```

For rhinestone, chrome, or surface-detail close-ups, add: `intentional highlight bloom on reflective surfaces, blooming the speculars on chrome and rhinestone.`

---

## MODE 3 — ACTION / COMBAT (Documentary-Sci-Fi)

**When to use:** Combat, chase, stunts, war, mech battles, alien encounters, fight choreography, any high-physicality scene with debris, smoke, dust, or destruction.

**Camera Capture line:**

```
Camera Capture: wide-latitude cinema capture, vintage [XX]mm 2x anamorphic character at a wide aperture — oval bokeh, soft edge falloff — light diffusion bloom softening highlights, handheld and shaky throughout with no stabilized shots, color-negative film rendition with heavier low-light grain, [palette descriptor] with dusty atmospheric haze, 24fps 180° shutter, [XX] seconds.
```

Replace `[palette descriptor]` with scene-appropriate language (e.g., "daylight overcast palette," "golden hour warm palette," "blue-hour cool palette," "stormy desaturated palette").

For impact slow-motion: append `intercut 96fps high-speed slow-motion at the [moment] holding 180° shutter for natural motion blur.`

---

## MODE 4 — PERFORMANCE / CONCERT (Pit-Photographer Documentary)

**When to use:** Stadium and arena performance shots, festival pits, concert footage, jumbotron-and-lightstick worlds, anywhere a performer is on stage with a crowd and stage lighting.

**Camera Capture line:**

```
Camera Capture: wide-latitude cinema capture, vintage [XX]mm 2x anamorphic character at a wide aperture — oval bokeh, horizontal streak flares on stage lights — light diffusion bloom softening highlights, mixed handheld pit-photographer and orbital operator energy with hard cuts between angles, color-negative film rendition with fine grain, [stage-lighting color cast], heavy volumetric haze, damp matte sweat with no specular sheen, 24fps 180° shutter, [XX] seconds.
```

Replace `[stage-lighting color cast]` with scene-specific language (e.g., "magenta-red color cast from the LED cube above," "amber and ultraviolet wash from side rigs," "cyan and white strobe punching through warm tungsten").

---

## MODE 5 — ATMOSPHERIC / EMPTY (Environment & Mood)

**When to use:** Abandoned cityscapes, no-humans environment plates, landscapes, weather pieces, slow-burn mood shots, world-establishing footage where the environment is the subject.

Also use for: "no humans," "abandoned," "empty," "ghost city," "deserted," "weather plate," "establishing wide" requests.

**Camera Capture line:**

```
Camera Capture: wide-latitude cinema capture, vintage [XX]mm 2x anamorphic character at a wide aperture — oval bokeh, soft edge falloff — light diffusion bloom softening highlights, locked-off or extremely slow push-in only, color-negative film rendition with fine grain, palette grade [hex values], atmospheric haze, weathered material detail, 24fps 180° shutter, [XX] seconds. No humans, environment is the subject.
```

Replace `[hex values]` with actual color codes for the scene's palette (e.g., "#2A3540, #4A5560, #6B7280, #8B7355, #A89178").
