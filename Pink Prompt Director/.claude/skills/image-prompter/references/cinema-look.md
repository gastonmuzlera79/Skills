# Cinema look — philosophy, render rules, night register, cinema stack

Part of the image-prompter skill. Read for any prompt that closes with the full cinema stack (Mode 4, or a white card on Modes 0, 1, 2), any night scene, and when writing a Modes 3/6 closing paragraph.

## CORE PHILOSOPHY

No plastic. No CGI sheen. No 3D-render look. No commercial gloss. No AI-generic skin or hair.

Every image this skill produces should read as a photograph — taken on a real camera, by a real person, of a real subject. The character should look lived-in: real pore texture, peach fuzz, hair with flyaways and individual strands catching light, fabric with weight and weave and wear, jewelry with surface detail, eyes with reflection and depth.

**The flattering-realism ceiling (LOCKED — applies to every face, every mode).** Full skin realism is always on — visible pore texture, peach fuzz at the jaw and hairline, subsurface scattering, hair flyaways, the matte finish that carries the anti-plastic look. But realism never means *unflattering*. Faces are never rendered with harsh, severe, or distracting imperfections: no acne, no blemishes, no prominent spots, no scarring, no enlarged or cratered pores, no rough or bumpy texture, no aggressive skin detail that reads as ugly or clinical. The texture is fine, soft, even, and natural — the lived-in realism of good cinema skin under a flattering key, not the brutal macro-detail of a dermatology photo. Matte (never plastic) is the anti-plastic lever; *fine and even* (never harsh) is the flattering lever. Both are always on together. When the two ever seem to pull against each other, resolve toward fine-even-flattering — a face should always look good.

Photorealism is not a tier you opt into — it's the universal default, baked into every prompt. The skill never produces a "stylized," "illustration," "anime," "painterly," "comic," or "rendered" prompt unless the user specifically requests a stylization override (rare, and then noted explicitly).

---

## UNIVERSAL RENDER RULES — FIGHTING THE AI AESTHETIC

These rules are baked into every Nano Banana Pro and GPT-2 prompt this skill produces. They're how the skill fights the AI render aesthetic — digital sharpness, dewy faces, plastic skin, glossy beauty register, AI-render flatness — and forces a real photographic register.

**1. Real human skin.**
- Real natural pore texture visible at close range — soft, fine, and even, never as blemishes or acne or marks, never enlarged/cratered/rough, never harsh clinical macro-detail
- Real peach fuzz catching light along the jawline, hairline, temples, and upper lip — fine, photographic, never plastic
- Real subsurface scattering present, warm and real — semi-translucent biology, not opaque plastic
- Skin tone held at the character's natural register — preserved through the grade, never washed out, never cool-shifted ghostly
- No retouching, no skin smoothing, no digital cleanup, no porcelain plastic look, no waxy AI render, no beauty bloom
- **Flattering ceiling:** the realism is always flattering — fine, soft, even texture under the key, never severe or unflattering imperfection. A face should look good and real at the same time; matte carries the anti-plastic, fine-and-even carries the flattering. Resolve any tension toward flattering.
- Doll-coded characters (when explicitly requested): smooth matte register without visible pores or peach fuzz but still real and natural, never plastic, never AI-render, never waxen

**2. Real hair physics — strand-by-strand, context-aware.**
- All hair rendered strand by strand with realistic flyaways, baby hairs at the hairline, separation between strands, light transmission through hair ends — never block-of-hair animation
- Hair responds to the actual environment of the scene: still interior = settled hair, moving vehicle = wild hair in active motion, wind = drift, action = kinetic lift and fall, wet = damp matte clumping never glossy oil-slick
- Hair register defaults matte — fine diffuse fiber with soft natural shape, never glossy shine, never reflective sheen unless the user specifies a high-gloss styling

**3. Real lens character.**
- Wide-latitude digital cinema capture as the default register — broad dynamic range, gentle filmic highlight roll-off, never a flat video look
- For character canonicals and seamless studio stills (gray or white): a clean fast normal prime around a 50mm full-frame field of view at a wide aperture — natural round bokeh, even sharpness, gentle background separation, no anamorphic stretch on portraits unless requested
- For scene plates with characters or environments: vintage 2x anamorphic optical character — oval bokeh, a gentle horizontal squeeze on out-of-focus highlights, soft frame-edge falloff, mild organic optical imperfection toward the edges, plus a light diffusion bloom that lifts highlights into a soft halation and takes the hard digital edge off
- Real anamorphic-style horizontal streak flares on point light sources when called for, never on portraits

**4. Real light physics.**
- **Atmospheric depth is default-on across every mode, scaled to fit the shot.** Visible haze and air density between planes — distant elements rendered softer, desaturated, lower contrast than foreground, never a flat backdrop. This is the primary lever against the flat, over-contrasted, plastic look: real air between camera, subject, and background is what makes a frame read as photographed depth rather than a pasted-on plane. Scale the density to the scene (thin for a clean interior, light for most exteriors, heavy for moody/night/destroyed environments) and apply it wherever the shot has planes to separate. The one place it reduces toward zero is a deliberately flat white-seamless still — and even there the mid-gray plate option carries the same low-contrast intent.
- Shadow falloff with physically accurate wrap on real anatomy — soft transitions, never hard edges, real human anatomy under real cinema light
- Subsurface scattering at ear edges, nostrils, eye sockets with warm undertone bleed
- Highlights rolled off gently in a filmic curve, never clipping to pure white — light blooms softly into haze rather than punching as hard white discs
- Lifted blacks that stay open and never crush to pure black, highlights that roll off and never clip — wide dynamic range, full detail held in both shadows and highlights

**5. Real grain.**
- Color-negative motion-picture film look — daylight-balanced for day registers, tungsten-balanced and pushed for night work, the organic color rendition of real film stock baked in
- Fine theatrical 35mm film grain across the entire frame including skin, fabric, atmosphere, backdrop — never the silent clinical fine-grain register of editorial photography
- The grain is what ties everything to real cinema photographic capture

**These five rules are the lock. Every prompt this skill produces invokes them through the merged cinema stack documented below.**

## NIGHT CINEMA REGISTER (FOR NIGHT SCENES)

When the user asks for a night scene, the night work has a specific theatrical action cinema target — **Justin Lin / James Wan / Greig Fraser night work**. This is the dark, practical-driven theatrical action night register seen in Tokyo Drift canyon scenes, Fast 5 night work, Furious 7 night chases, The Batman, John Wick. Critical principle: theatrical night cinema is **mostly dark, with hard punchy practicals cutting through**. NOT saturated-teal-everywhere. NOT bright-night.

**Two modes of night cinema:**

**A. EXTERIOR CANYON / OPEN NIGHT (cliff overlooks, canyon roads, remote night):**
- Light comes EXCLUSIVELY from practical sources in the scene (headlights, brake lights, dash glow leaking out doors, distant city glow). No ambient moonlight, no ambient sky lift.
- The sky and surroundings are committed to deep crushed near-black darkness
- A faint horizon glow may be visible at very deep distance — small, contained, abstract neon color (magenta, cyan, warm amber, hot pink) barely readable as far-off civilization, NOT bright enough to illuminate anything in foreground or midground
- Atmospheric haze suspended in air catches headlight beams as visible warm white volumetric god rays
- Headlight backscatter lights only the immediate front of each vehicle and the rocks/ground directly in front
- Everything outside the headlight throws and their immediate backscatter falls into deep crushed near-black shadow
- The cars themselves read primarily as silhouettes against the night sky with their headlight glow defining their forward edges
- This is the Tokyo Drift canyon night register — DARK, with hard warm headlight punch as the only light

**B. INTERIOR / URBAN / LIT NIGHT (parking garages, warehouses, city streets, interior cabins):**
- Practical sources in the scene drive the look — sodium-vapor street lamps, fluorescent garage lights, neon signs, dash glow, brake lights, interior lighting
- Teal-amber color split can read here because practical sources motivate it (cool sodium / fluorescent / neon vs warm dash / brake / amber lights)
- Atmospheric haze gives light volumetric body
- Background subjects readable through the lit zones
- This is the Tokyo Drift parking garage register, Furious 7 night chase register — practical-driven, deep contrast, real teal-amber color split where motivated

**Universal night cinema rules across both modes:**

**Contrast:** Deep cinematic contrast — shadows are deep but hold information, highlights are hot but don't clip into mush. Wide dynamic range that reads on a real cinema screen.

**Practicals punch hard:** Headlights cut through darkness with real intensity and volumetric throw. Brake lights saturate hot red. Dash glow saturates cabin interiors. Light HITS the scene with purpose, not softly diffused into mush.

**Atmospheric haze:** Light volumetric haze suspended in air (canyon dust, urban smog, breath, ground moisture). The haze catches practical light beams as visible volumetric cones. This is what makes light feel real on screen.

**Rim and edge light:** Subjects in night scenes defined against dark backgrounds by rim and edge light from practical sources. Never silhouettes that disappear, never flat-lit faces with no edge definition.

**Skin in night:** Skin reads warm against cool ambient when there's any cool ambient to read against. Real human skin tone preserved through the grade. Practical light sources warm one side of the face — natural face-side-lighting from real cinema gaffer work.

**The reference is unambiguous:** Real theatrical action movie nights projected onto real IMAX screens. Tokyo Drift, Fast 5, Furious 7, The Batman, John Wick. Theatrical, punchy, **mostly dark, with practical light cutting through**. Never bright-night, never saturated-teal-everywhere, never AI fantasy render.

## THE CINEMA STACK (LOCKED — APPENDS TO MOST PROMPTS)

Every prompt this skill outputs ends with a version of this single merged cinema stack. It's the texture + light physics + lens character + grain foundation that fights every AI render tell at once. One block, one job — close the prompt with a real photographic register.

```
Real human skin captured on a real cinema camera — refined and real, peach fuzz catching light along the jawline and hairline, real natural pore texture soft fine and even, subsurface scattering at ear edges, nostrils, and around the eye sockets with warm undertone bleed reading as semi-translucent biology never opaque plastic. No retouching, no skin smoothing, no porcelain plastic look, no waxy AI render, no blemishes, no acne, no marks, no enlarged or rough pores, no harsh clinical texture — fine flattering even skin that always looks good, no dewy wet finish, no glass-skin, no highlighter glow. Hair rendered strand by strand with realistic flyaways and baby hairs at the hairline, hair physics responding to the actual environment of the scene — wind makes it fly, stillness lets it settle. Fabric with real weave detail, real weight, real drape. Captured with a wide-latitude cinema look, lens character matched to the shot — a clean fast normal prime around a 50mm full-frame field of view at a wide aperture for portraits and character canonicals giving natural round bokeh and even sharpness, OR a vintage 2x anamorphic character for scene plates giving oval bokeh, a gentle horizontal squeeze on out-of-focus highlights, soft frame-edge falloff, organic optical imperfection toward the edges, a light diffusion bloom lifting highlights into a soft halation, and subtle horizontal streak flares on point light sources. Shallow depth of field with strong foreground-to-background separation. True atmospheric perspective with visible haze and air density between planes — distant elements rendered softer, desaturated, and lower contrast than foreground, real volumetric atmosphere never a flat backdrop. Key light wrapping around subjects with physically accurate shadow falloff into the neck, jawline, ear shadow, nostril shadow, lip shadow, collarbone shadow — soft transitions never hard edges, real human anatomy under real cinema light. Highlights rolled off gently in a filmic curve, never clipping to pure white, light blooms softly into haze rather than punching as hard white discs. Lifted blacks that stay open and never crush to pure black, highlights that roll off and never clip — wide dynamic range with full detail held in both shadows and highlights. Color-negative motion-picture film look baked in — daylight-balanced rendition for day registers, tungsten-balanced and pushed for night work, fine theatrical 35mm film grain across the entire frame including skin, fabric, atmosphere, and backdrop. No HDR overprocessing, no digital oversharpening, no plastic skin rendering, no uniformly-lit flat-plane staging — photographed not generated, captured on a real camera by a real cinematographer on a real set.
```

**Modal application:**
- **Mode 4 (GPT-2 detail):** append the full stack as the closing block. **Modes 0, 1 and 2** on the default mid-gray backdrop close with the lean Rembrandt grade from the MID-GRAY SEAMLESS section instead (the full stack only on an explicit white card). **Mode 5** has its own locked closing.
- **Mode 3 (environment plate) and Mode 6 (character-in-scene):** both use the cinema-prose register, which folds the cinema stack language INTO the closing camera-spec paragraph rather than appending it as a separate block. See Mode 3 documentation for the prose register and its closing realism clause.

**The single most powerful phrases in this stack:**
- **"atmospheric perspective with visible haze and air density between planes"** — forces multi-plane depth instead of single-plane staging. Biggest fix for the "video game" look.
- **"shadow falloff into the neck, jawline, ear shadow, nostril shadow"** — fights the AI uniform-lit face. Forces real anatomical shadow geometry.
- **"subsurface scattering at ear edges, nostrils, and around the eye sockets with warm undertone bleed"** — fights plastic skin at the biological level. Forces the model to render skin as semi-translucent biology instead of opaque material.
- **"highlights rolled off gently in a filmic curve, never clipping to pure white"** — fights the blown-bright AI highlight that makes everything look digital. Forces the cinema highlight roll-off.
- **"photographed not generated, captured on a real camera by a real cinematographer on a real set"** — surprisingly strong negative signal against AI uniformity at the language level.

**For pure environment plates with no humans:** drop the human-skin and hair lines, drop the subsurface scattering line, drop the shadow-falloff-on-anatomy line. Keep the lens character, atmospheric perspective, light physics, log curve, grain, and closing realism clause.
