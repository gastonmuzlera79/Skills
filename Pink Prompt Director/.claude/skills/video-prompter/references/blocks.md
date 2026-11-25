# Prompt blocks — reading references through Sound Bed

Part of the video-prompter skill. These specs cover the blocks of the locked order from Frame Map to Sound Bed.

## READING REFERENCE IMAGES

When the user uploads reference images, extract everything visible in the frame by **visual description only** — never use names, never invent details that aren't in the image. The extracted reading is for Claude's own understanding and the pre-prompt check. The actual prompt body trusts the reference image and only restates what the image cannot carry.

**For each character in the reference, capture:**

- **Hair:** color (every nuance), length, style, texture, parting, styling, accessories
- **Makeup:** skin finish, brow shape and density, eye treatment, lashes, lip register, cheek treatment, any face jewelry, freckles or beauty marks **only if visible**
- **Wardrobe:** every garment top to bottom — fabric, color, fit, structural details, neckline, sleeve length, hem position, layering
- **Jewelry & accessories:** every piece — earring style, necklace count and material, rings, bracelets, body chains, belts, bag, sunglasses, watch
- **Body markers:** piercings, tattoos, nail length and color (only if visible)
- **Pose and energy:** body angle, weight distribution, hand position, expression register

**For each environment in the reference, capture:**

- **Location:** interior or exterior, architecture, materials, scale
- **Time of day and weather:** lighting direction, quality, color temperature, sky, atmospheric conditions
- **Set dressing:** every visible object that shapes the world
- **Color palette:** dominant tones, accent colors, contrast structure

**Naming rule (absolute lock).** NEVER use proper names in the prompt output. Refer to every character by visual description only.

**No-invention rule.** If the user gives you a reference image and asks for the same character in a new scene, do not invent wardrobe or styling details that aren't in the image or specified in the request.

**Trust-the-reference rule.** Once a character's wardrobe and identity are anchored to an `@imageN` tag, the Subject Lock block in the prompt body does NOT re-describe every garment in detail. The lock-down line ("face, hair, wardrobe, and silhouette identical throughout") closes the block. Only state-changes the image can't carry (damp, dirty, torn, wet, dusty, bloodied) get spelled out.

**Canonical-over-plate rule (HARD LOCK).** Every named subject that appears in a Seedance scene gets its canonical reference attached as its own `@imageN` slot — even if that subject is also visible in the rendered environment plate. Characters, vehicles, props, creatures, animals — anything with locked identity that needs to hold across the cut gets its dedicated reference, no exceptions. The plate carries the world (location, weather, light, set dressing, composition); canonical references carry identity (face, body, livery, markings, silhouette). The plate is never a substitute for a canonical reference, and a subject's visible presence in the plate never reduces or removes the requirement to attach its canonical reference. If a character's reference sheet exists, attach it. If a vehicle's canonical reference exists, attach it. Subject Locks anchor to the canonical reference tag; the World Plate block anchors to the plate tag. This is the rule that prevents identity drift between the plate and the rendered Seedance output.

---

## FRAME MAP

Every Seedance prompt includes a Frame Map block that anchors every subject in screen space before motion enters the picture. Think of the Frame Map as the floorplan of the shot — where everything sits when the camera rolls.

**Treat the frame as 2D screen space:**

- **Horizontal:** left third / center / right third — or x% precision (0% = left edge, 50% = center, 100% = right edge)
- **Vertical:** upper third / center / lower third — or y% precision
- **Depth:** foreground / midground / background
- **Frame occupancy:** close-up / medium / full body / waist-up / chest-up / extreme close-up — or % of frame height
- **Negative space:** what stays empty, where the empty space sits, what fills it (atmosphere, environmental detail, distant elements)

**Single-subject example:**

> Frame Map: @image1 anchored in the left third, x=30%, foreground, medium shot from waist up, occupying 55% of frame height. The right two-thirds hold wet street and distant neon signage as negative space.

**Two-subject example:**

> Frame Map: @image1 in the left third, x=28%, foreground. @image2 in the right third, x=72%, midground, slightly deeper. The center holds open as tense negative space between them. Neither crosses the central vertical axis.

**Multi-shot example:**

> Frame Map: Shot 1 (0–6s) — wide two-shot. @image1 in the left third, x=32%, foreground, bent at the waist. @image2 in the right third, x=68%, midground, leaning against @image3. Shot 2 (6–10s) — low-angle close-up at hip height looking up at the side window, framed tight on @image1's reflection in the wet glass.

**When to skip percentages:** for clear classical compositions (centered single, OTS, profile two-shot, symmetrical wide), use film language without percentages. Coordinates earn their place when the composition is asymmetric, tightly blocked, or character drift would visibly break the shot.

---

## SUBJECT LOCK

Every character in the frame gets a Subject Lock block. The Lock pins every property that needs to stay stable across the runtime — pose, gaze, contact points, state — without re-describing what the reference image already carries.

**Properties to pin per character:**

- **Identity anchor:** which `@imageN` carries the face, hair, wardrobe, silhouette
- **Body orientation:** facing camera / profile left / profile right / three-quarter toward screen-right or screen-left / back to camera
- **Pose:** the specific physical posture (standing, kneeling, leaning, seated, walking, bent at the waist, hands raised, hand resting on X)
- **State:** emotional register described by what the body and face physically do — never abstract feelings
- **Expression:** lips, eyes, brow, jaw register
- **Gaze direction:** looking at @imageN / looking screen-left / looking screen-right / looking offscreen toward X / locked on camera (rare)
- **Contact points:** where the body physically touches the world — feet on which surface, hand on which object, body part against which surface
- **State-change details the image can't carry:** damp, dirty, torn, wet, dusty, bloodied
- **Lock-down line:** "face, hair, wardrobe, and silhouette identical throughout"

**Single-character example:**

> Subject Lock — @image1: Face, hair, wardrobe, and silhouette identical throughout. Ponytail damp from the drizzle, fabric darker where rain has soaked in. Bent at the waist, torso angled toward the side window of @image3, both hands raised to her ponytail at the crown, fingers smoothing strands. Body squared to the car, weight even. Gaze locked on her own reflection in the wet glass.

**Multi-character example:** each character gets a discrete Subject Lock block.

> Subject Lock — @image1: [block for first character]
>
> Subject Lock — @image2: [block for second character]

Never jam multiple characters into one Subject Lock paragraph. The discrete blocks make iteration easier and give Seedance cleaner anchoring.

---

## CROSS-FRAME RULES

When two or more characters share the frame, the Frame Map and Subject Lock blocks aren't enough on their own — the relationships between characters need their own explicit rules. Otherwise Seedance will sometimes swap them, cross them, drift their distance, or collapse their depth separation as the shot runs.

**Rules to specify for every multi-character shot:**

- **No swap:** characters never trade screen positions
- **No center crossing:** characters never cross the central vertical axis (unless an action demands it, in which case state the crossing with timing)
- **No depth change:** characters hold their depth layer throughout
- **Distance consistency:** the gap between them stays constant
- **Screen sides held:** left character stays left, right character stays right
- **Eyelines:** who looks at whom, and whether the look holds or breaks
- **Carry-across-the-cut:** for multi-shot sequences, name what holds when the camera cuts

**Standard language:**

> Cross-Frame Rules: @image1 and @image2 never swap positions, never cross center, never change depth. Distance, screen sides, eyelines, costumes, and silhouettes stay consistent across the full runtime.

**Multi-shot variant:**

> Cross-Frame Rules: @image1 holds her position at the side window across the full runtime of Shot 1. @image2 holds her lean at the rear quarter panel across Shot 1. In Shot 2 only the camera changes — @image1's position holds.

**When characters do need to cross:** state the crossing explicitly with timing. "At 4 seconds, @image1 steps across the central axis from the left third into the center. After 5 seconds, the new blocking holds: @image1 in the center foreground, @image2 unchanged in the right third midground."

---

## MOVEMENT

Movement in a Seedance shot is layered, not unified. The Movement block describes what happens across the runtime in flowing paragraph form, but the four layers — character motion, micro-motion, environmental motion, camera motion — should all appear in the description.

**The four layers (write them in this order in the paragraph):**

1. **Character motion** — what the subjects physically do across the runtime, with per-beat timestamps
2. **Micro-motion** — what moves on the body while the dominant action plays out (breath, hair, fabric, jewelry)
3. **Environmental motion** — what the world does around the subjects (rain, smoke, dust, traffic, wind, particles)
4. **Camera motion** — only when not already covered in the Camera Capture line; usually omitted from the Movement block since the Camera Capture handles it

**Single-shot example:**

> Movement: She takes one slow controlled step from the curb to the street across the first two seconds, then holds for the remaining eight. Ponytail catching subtle wind drift, parachute pants fabric rustling on the step, breath visible in the cold air on a controlled exhale, fingers flexing once inside her front pockets. Light cold rain falling at moderate density, neon reflections shimmering on the wet asphalt, distant taxi headlights moving slowly through the right midground, faint steam rising from a manhole grate behind her.

**Multi-shot example:**

> Movement: Shot 1 (0–6s) — @image1 smooths her ponytail at the crown, fingers working through strands. @image2 watches her with a soft closed-lip smile across the first three seconds, exhales a short scoff at 3 seconds, then turns her head slowly away toward the horizon screen-right and holds. Rain drizzles steadily, damp hair on both catches subtle wind, faint mist off the warm hood. Hard cut to Shot 2 (6–10s) — low-angle close-up looking up at the side window. Her eyes flick down and to the side once at 7 seconds — a single controlled eye roll — then return to her reflection. Hands resume smoothing the ponytail. Rain streaks roll down the wet glass naturally across the full close-up.

**Critical rule:** never tangle the four layers. Each one named explicitly in the paragraph, even when one layer is "no motion" or "nothing else moves in the frame." Saying nothing moves is a directive; absence is not.

---

## LAST FRAME

Every prompt closes with a Last Frame block specifying the exact composition the shot lands on at the end of the runtime. Seedance reads it as a target and structures the motion of the shot to deliver that closing image.

**What goes in the Last Frame block:**

- Where each character sits at the close (carries the Frame Map forward to the end)
- Their final pose / state / gaze
- What the camera is showing in focus
- What's in negative space at the close
- The visual punctuation — what the viewer's eye lands on
- **On-screen text suppression line:** "No on-screen text, no captions, no signage typography, no rendered text in the frame." (skip only when text is explicitly requested)

**Strong examples:**

> Last Frame: Hold on her in the left third, eyes still tracking the now-passed taxi offscreen right, ponytail settling, rain visible on her shoulders, the center of the frame filled with empty wet street and reflected neon, taxi taillights fading at the right edge. No on-screen text, no captions, no signage typography, no rendered text in the frame.

> Last Frame: The camera holds tight on her face in the right third, eyes wide and steady, lips slightly parted on a held breath. Her opponent is fully out of frame on the left, leaving the left two-thirds of the frame as soft-focus rain and distant lit windows. No on-screen text, no captions, no signage typography, no rendered text in the frame.

**Last Frame is mandatory.** Every prompt closes with this block.

---

## WORLD PLATE

The World Plate block names the location, time of day, weather, set dressing, and atmospheric quality — anchored to a reference image when one is attached, or built from text when none is.

**Properties to specify:**

- **Location:** anchored to @imageN if a plate is attached; otherwise built from text
- **Time of day and weather:** lighting direction, quality, color temperature, sky, atmospheric conditions
- **Set dressing:** specific objects that shape the world (vehicles, signage, debris, vegetation, props, crowd)
- **Color palette:** dominant tones, contrast structure
- **Atmospheric quality:** haze density, particle suspension, weather intensity

**Single-shot example:**

> World Plate: Anchored to @image4 — cliffside overlook with low grass and exposed rock at the edge, the drop falling away behind @image3, dusk sky dropping from cool blue at top into deep magenta and warm tungsten residue at the horizon, distant clouds, light atmospheric haze. @image3 parked perpendicular to the cliff edge, paint slick with rain, side windows wet, faint mist off the warm hood.

**Text-only example (no plate attached):**

> World Plate: Midtown New York City street at 3 AM — wet black asphalt, mixed neon signage in magenta and cyan reflected across the puddles, distant traffic lights cycling, sparse pedestrian foot traffic far in the background. Light cold rain at moderate density. Steam rising from grates.

---

## SOUND BED

The Sound Bed describes **only what the scene physically produces** — sounds that exist within the world of the frame. Never reference music, lyrics, song names, soundtrack cues, or score. If the user wants music in the final cut, they add the track separately in post.

**Allowed in the Sound Bed:**

- Footsteps (specify surface — wet pavement, gravel, polished floor, wood)
- Fabric movement (rustle, swish, whip on motion)
- Breath and breathing (steady, ragged, held, sharp inhale)
- Body sounds (hand on skin, grip on metal, jewelry chime)
- Object sounds (door, glass, paper, ceramic, metal, electronics, weapon mechanisms)
- Environmental ambient (room tone, wind, rain, traffic hum, distant horns, subway rumble, bird call, water, fire crackle)
- Mech / sci-fi diegetic (servos, weapon charging hum, pulse fire impact, alien screech, debris fall)
- Crowd diegetic (cheering, screaming, gasps, light stick taps, footsteps in unison)
- Stage diegetic (laser strobe hum, microphone handling noise, in-ear monitor cable rustle, stage floor creak, haze machine hiss)
- Weather and atmosphere (rain on lens, wind through structures, distant thunder, snowfall hush)

**Never in the Sound Bed:**

- Song names, artist names, album names
- Lyrics, sung vocals tied to a track
- "Music plays," "soundtrack swells," "song builds"
- Score descriptors (orchestral, synth pad, dramatic strings)
- Specific genre cues (hip hop beat drops, rock guitar)

**Audio modes (pick one based on user intent — ask if ambiguous):**

- **Option A (default) — Diegetic with SFX and ambient.** Realistic in-scene audio. `Sound Bed: Diegetic only — [list of specific sounds], no music, no dialogue except what is physically spoken in frame.`
- **Option B — Silent capture.** Used only when the user explicitly says they will upload music in post AND wants NO in-camera audio fighting it. `Sound Bed: NONE — fully silent capture. The audio track will be added separately in post.`
- **Option C — Diegetic with SFX, no music explicitly.** Same as Mode 1, just confirming no music will be added. `Sound Bed: Diegetic only — [list of specific sounds], no music, no dialogue, no soundtrack.`

Options A and C are the defaults. Use Option B only when the user explicitly says they're adding a music track in post AND wants the video silent.

**Sound Bed example:**

> Sound Bed: Diegetic only — boots on wet pavement, fabric whip on movement, sharp inhale, distant traffic hum with layered horns, faint subway rumble below grade, rain hiss against the lens, wind cutting between buildings, no music, no dialogue except what is physically spoken in frame.

## NEGATIVE → POSITIVE REWRITES

Seedance responds far better to positive locks than to negative prohibitions.

| Instinct (negative) | Lock (positive) |
|---|---|
| Don't change face | @image1 keeps the same face, hair, wardrobe, and silhouette throughout. |
| Don't switch positions | @image1 remains in the left third throughout; @image2 remains in the right third throughout. Neither crosses the center line. |
| Don't drift | Boots stay planted on the same ground marks across the full runtime. Only breath, eyes, hair, and fabric move subtly. |
| Don't change costume | Wardrobe identical across the runtime. |
| No extra people | The frame contains only @image1 and @image2 in their specified positions. No other figures enter or pass through. |
| No on-screen text | No on-screen text, no captions, no signage typography, no rendered text in the frame. |
| No camera chaos | Slow controlled handheld with natural operator breath, preserving @image1 in the left third and @image2 in the right third throughout. |
| No blur | Subjects remain sharply focused; controlled cinematic motion blur appears only on falling rain and distant background light sources. |
| Don't blink mid-action | Gaze stays locked on @image2 across the full runtime, eyes steady, no break in eye contact. |
| No mode switching | The shot runs as one continuous take with no cuts, no scene change, no time jump. |

**Always prefer the positive form.** Negative phrasing belongs only in the explicit suppression lines for known Seedance failure modes (the on-screen text suppression is the canonical example).
