# Partitura + foley + voz -> out/mix.wav (48 kHz estéreo). Lee events.json (de events.mjs) y voice/dur.json.
# Uso (desde la librería): $LIB/.venv/bin/python <proyecto>/mix.py
import json, os, sys, numpy as np, soundfile as sf
HERE = os.path.dirname(os.path.abspath(__file__))
LIB = os.environ.get('LIB', '/home/user/lemomo-ai/lemo-opuscar')
sys.path.insert(0, os.path.join(LIB, 'core', 'audio'))
import pluck as P
from scipy.signal import butter, sosfilt, resample_poly, fftconvolve
from scipy.ndimage import maximum_filter1d

SR = 48000
ev = json.load(open(os.path.join(HERE, 'events.json')))
DUR = ev['dur']; N = int(DUR * SR); E = ev['ev']
dur = json.load(open(os.path.join(HERE, 'voice', 'dur.json')))
rng = np.random.default_rng(5)

def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], 'band', fs=SR, output='sos'), x)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def noise(n): return rng.standard_normal(n)
def pink(n):
    w = np.fft.rfft(noise(n)); f = np.arange(len(w)); f[0] = 1
    return np.fft.irfft(w / np.sqrt(f), n) * 20
def norm(x, p=1.0): return x / (np.abs(x).max() + 1e-9) * p
def st(x, pan=0.0):
    l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    return np.stack([x * l * 1.414, x * r * 1.414], 1)
def dbfs(x): return 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-12)
def fade(x, fi, fo):
    n = len(x); e = np.ones(n); a = int(fi * SR); b = int(fo * SR)
    if a: e[:a] = np.linspace(0, 1, a) ** 1.5
    if b: e[-b:] = np.minimum(e[-b:], np.linspace(1, 0, b) ** 1.5)
    return x * (e[:, None] if x.ndim == 2 else e)
IRn = int(1.6 * SR); IR = np.stack([noise(IRn), noise(IRn)], 1) * np.exp(-np.arange(IRn) / SR * 3.6)[:, None]
IR = np.stack([lp(IR[:, 0], 4500), lp(IR[:, 1], 4500)], 1); IR /= np.sqrt((IR ** 2).sum(0))
def verb(x2, wet=.25):
    y = np.stack([fftconvolve(x2[:, 0], IR[:, 0])[:len(x2)], fftconvolve(x2[:, 1], IR[:, 1])[:len(x2)]], 1)
    return x2 * (1 - wet) + y * wet
def put(buf, t, x):
    i = int(t * SR); j = min(N, i + len(x))
    if j > i and i >= 0: buf[i:j] += x[:j - i]

# ---------------- foley ----------------
def brush(d, g, pan0=-.6, pan1=.6):
    """varias pasadas de pincel sobre papel: cada una un roce de ruido filtrado con su propio arco"""
    n = int(d * SR); out = np.zeros(n); t = 0.0
    while t < d - .1:
        L = min(rng.uniform(.3, .75), d - t); k = int(L * SR); p = np.arange(k) / k
        x = bp(noise(k), 1600, 7500) * (.55 + .45 * np.abs(np.sin(np.arange(k) / SR * 2 * np.pi * rng.uniform(7, 12)))) + bp(pink(k), 300, 1500) * .45
        out[int(t * SR):int(t * SR) + k] += norm(x * np.sin(np.pi * p) ** .9, rng.uniform(.5, 1))
        t += L + rng.uniform(.03, .14)
    pan = np.linspace(pan0, pan1, n)
    y = norm(out, .5) * g
    return np.stack([y * np.cos((pan + 1) * np.pi / 4) * 1.414, y * np.sin((pan + 1) * np.pi / 4) * 1.414], 1)
def pencil(d, g):
    n = int(d * SR); x = np.zeros(n); t = 0.0
    while t < d - .05:
        L = min(rng.uniform(.05, .16), d - t); k = int(L * SR)
        x[int(t * SR):int(t * SR) + k] += bp(noise(k), 2200, 7000) * np.hanning(k) * rng.uniform(.4, 1)
        t += L + rng.uniform(.02, .09)
    return st(norm(x, .35) * g, rng.uniform(-.2, .2))
def plate(g):
    n = int(.5 * SR); t = np.arange(n) / SR; f = rng.uniform(.92, 1.08)
    x = sum(a * np.sin(2 * np.pi * fr * f * t) * np.exp(-t * d) for fr, a, d in [(2350, 1, 28), (3480, .6, 34), (5300, .35, 44), (1700, .3, 20)])
    x += bp(noise(n), 3000, 9000) * np.exp(-t * 400) * .5
    return verb(st(norm(x, .6) * g, rng.uniform(-.5, .5)), .3)
def glass(g):
    n = int(1.3 * SR); t = np.arange(n) / SR; f = rng.uniform(.95, 1.05)
    x = sum(a * np.sin(2 * np.pi * fr * f * t) * np.exp(-t * d) for fr, a, d in [(2980, 1, 5.5), (4470, .4, 7), (7000, .15, 10)])
    return verb(st(norm(x, .5) * g, rng.uniform(-.4, .4)), .35)
def pour(d, g):
    n = int(d * SR); t = np.arange(n) / SR; x = bp(noise(n), 700, 3200) * (.4 + .6 * np.sin(np.pi * t / d))
    for _ in range(int(d * 28)):
        i = rng.integers(0, n - 4000); f0 = rng.uniform(500, 1100); k = 2400; tt = np.arange(k) / SR
        x[i:i + k] += .5 * np.sin(2 * np.pi * np.cumsum(f0 * (1 + 3 * tt)) / SR) * np.exp(-tt * 40) * rng.uniform(.3, 1)
    return st(norm(x * np.minimum(1, (d - t) / .3), .5) * g, .2)
def boil(d, g):
    n = int(d * SR); t = np.arange(n) / SR; x = lp(pink(n), 450) * .5
    dens = np.linspace(8, 30, n)
    for i in np.where(rng.random(n) < dens / SR)[0]:
        k = 3200
        if i + k >= n: continue
        f0 = rng.uniform(260, 780); tt = np.arange(k) / SR
        x[i:i + k] += .9 * np.sin(2 * np.pi * np.cumsum(f0 * (1 + 4.5 * tt)) / SR) * np.exp(-tt * 38) * rng.uniform(.3, 1)
    return fade(st(norm(x, .5) * g, .1), 1.0, 1.6)
def thump(g):
    n = int(.4 * SR); t = np.arange(n) / SR
    x = np.sin(2 * np.pi * np.cumsum(95 * (1 + .6 * np.exp(-t * 40))) / SR) * np.exp(-t * 16) + lp(noise(n), 700) * np.exp(-t * 60) * .5
    return verb(st(norm(x, .7) * g), .15)
def airy(d, g):
    n = int(d * SR); p = np.arange(n) / n; x = bp(pink(n), 300, 3200) * np.sin(np.pi * p) ** 1.8
    return st(norm(x, .4) * g)
def murmur(d, g):
    """voces de mesa sin palabras: ruido de banda angosta con sílabas lentas, tres 'hablantes'"""
    n = int(d * SR); t = np.arange(n) / SR; out = np.zeros(n)
    for k in range(3):
        f0 = [180, 220, 140][k]; syl = np.abs(np.sin(2 * np.pi * rng.uniform(3.2, 5.2) * t + rng.uniform(0, 6))) ** 1.6
        gate = np.clip(np.sin(2 * np.pi * rng.uniform(.18, .33) * t + rng.uniform(0, 6)) * 1.6, 0, 1)
        buzz = sum(np.sin(2 * np.pi * f0 * h * t * (1 + .02 * np.sin(2 * np.pi * 4.1 * t + k)) + rng.uniform(0, 6)) / h for h in range(1, 18))
        out += bp(buzz, 250, 2600) * syl * gate
    out = lp(out, 3000)
    return fade(st(norm(out, .5) * g, 0), 1.5, 1.5) * np.array([1, 1])
def lift(g):
    n = int(.7 * SR); t = np.arange(n) / SR
    x = bp(noise(n), 1800, 6500) * np.exp(-t * 7) * np.minimum(1, t / .02)
    return verb(st(norm(x, .35) * g), .2)

sfx = np.zeros((N, 2))
for e in E:
    t, ty = e['t'], e['type']
    if ty == 'pencil': put(sfx, t, pencil(e['dur'], .5))
    elif ty == 'brush': put(sfx, t, brush(e['dur'], .45 * e.get('gain', .8), -.7, .7))
    elif ty == 'plate': put(sfx, t, plate(.32))
    elif ty == 'glass': put(sfx, t, glass(.2))
    elif ty == 'pour': put(sfx, t, pour(e['dur'], .22))
    elif ty == 'boil': put(sfx, t, boil(e['dur'], .22))
    elif ty == 'thump': put(sfx, t, thump(.5 * e.get('g', 1)))
    elif ty == 'mist': put(sfx, t, airy(e['dur'] + .5, .3))
    elif ty == 'burst': put(sfx, t, airy(1.2, .32)); put(sfx, t + .15, brush(.9, .5, -.8, .8))
    elif ty == 'murmur': put(sfx, t, murmur(e['dur'], .13))
    elif ty == 'lift': put(sfx, t, lift(.4))
# aire de cuarto muy bajo, todo el tiempo (el casi-silencio de 24 a 27 s no es silencio digital)
room = lp(pink(N), 700) * .012
sfx += st(room)

# ---------------- música ----------------
mus = np.zeros((N, 2))
BPM = 72; B = 60 / BPM; BAR = 4 * B
CH = {   # bajo, notas del arpegio
    'G': ('G2', ['D3', 'G3', 'B3', 'D4']), 'Em': ('E2', ['B2', 'E3', 'G3', 'B3']),
    'C': ('C3', ['E3', 'G3', 'C4', 'E4']), 'D': ('D3', ['A3', 'D4', 'F#4', 'A4']),
}
def note(inst, pitch, t, d, vel, pan=0, gain=1.0):
    x = P.pluck(inst, pitch, d, vel=vel)
    put(mus, t, st(x * gain, pan))
def bar(name, t0, dens=2, vel=.55, tail=0.0):
    bass, up = CH[name]
    note('nylon_guitar', bass, t0, 2.2, vel * 1.05, -.2)
    pat = [1, 2, 0, 3, 2, 1, 3, 2] if dens == 2 else [1, 2, 3, 2]
    step = B / 2 if dens == 2 else B
    for i, k in enumerate(pat):
        tt = t0 + (i + 1) * step
        if tt < t0 + BAR - .01: note('nylon_guitar', up[k], tt, 1.4, vel * (.85 + .15 * (i % 2 == 0)), -.2 + .1 * k)
# sección B (4–10 s): entra la guitarra, rala
bar('G', 4.0, 1, .45); bar('Em', 4.0 + BAR, 1, .5)
# sección C (10–24): arpegios en corcheas
for i, nm in enumerate(['C', 'D', 'G', 'Em']): bar(nm, 4.0 + (2 + i) * BAR, 2, .55)
# 24.0: último acorde y corte seco
x = P.strum('nylon_guitar', ['G2', 'D3', 'G3', 'B3', 'D4'], 1.0, vel=.6, spread=.03); put(mus, 24.0, st(fade(x[:int(.9 * SR)], 0, .5) * .9, -.1))
# sección E (27–40): vuelve la música con el grupo
x = P.strum('nylon_guitar', ['G2', 'D3', 'G3', 'B3', 'D4', 'G4'], 2.0, vel=.8, spread=.035); put(mus, 27.0, st(x, -.1))
for nm, t0 in [('G', 27.0 + BAR * 0 + 0.0), ('Em', 27.0 + BAR), ('C', 27.0 + 2 * BAR), ('D', 27.0 + 3 * BAR)]:
    if nm == 'G':   # el primer compás sólo arranca después del acorde
        bass, up = CH['G']; note('nylon_guitar', bass, t0 + B * 2, 2, .45, -.2)
        for i, k in enumerate([2, 1, 3, 2]): note('nylon_guitar', up[k], t0 + B * 2 + (i + 1) * B / 2, 1.4, .45, .0)
    else: bar(nm, t0, 2, .5 if nm != 'D' else .42)
# caja de música: acentos agudos, siempre de la escala de sol
MB = [(12.4, 'D5', .55), (12.9, 'G5', .45), (17.4, 'E5', .55), (17.9, 'B5', .42), (21.6, 'G5', .55), (22.1, 'D6', .4),
      (28.0, 'B5', .5), (29.4, 'D6', .45), (31.8, 'A5', .5), (32.3, 'B5', .5), (35.5, 'D5', .55), (38.3, 'F#5', .6)]
for t, p, v in MB: note('music_box', p, t, None, v, .25, .9)
# cuerdas suaves bajo el grupo (sintetizadas: sierras desafinadas filtradas, ataque lento)
def pad(freqs, t0, d, g):
    n = int(d * SR); t = np.arange(n) / SR; x = np.zeros(n)
    for f in freqs:
        for dt in (-.004, 0, .004):
            ph = rng.uniform(0, 1); x += 2 * ((t * f * (1 + dt) + ph) % 1) - 1
    x = lp(x, 1500, 2) * np.minimum(1, t / 1.4) * np.minimum(1, np.maximum(0, d - t) / 1.8)
    put(mus, t0, st(norm(x, .5) * g, 0))
hz = lambda m: 440 * 2 ** ((m - 69) / 12)
pad([hz(m) for m in (55, 59, 62, 67)], 27.0, 4.6, .55)   # G
pad([hz(m) for m in (52, 55, 59, 64)], 30.6, 4.2, .5)    # Em
pad([hz(m) for m in (48, 55, 60, 64)], 34.0, 3.6, .45)   # C
pad([hz(m) for m in (50, 57, 62, 66)], 37.2, 2.8, .32)   # D, abierto
mus = fade(verb(mus, .2), 0, 1.4)

# ---------------- voz ----------------
vo = np.zeros(N); duck = np.zeros(N)
def compress(x, thr=-24, ratio=3.0):
    e = np.sqrt(np.maximum(lp(x ** 2, 30), 0) + 1e-10); lv = 20 * np.log10(e)
    return x * 10 ** (np.where(lv > thr, (thr - lv) * (1 - 1 / ratio), 0) / 20)
for e in E:
    if e['type'] != 'vo': continue
    x, vsr = sf.read(os.path.join(HERE, 'voice', e['id'] + '.wav'))
    if x.ndim > 1: x = x.mean(1)
    x = resample_poly(x, SR, vsr); x = compress(hp(x, 90))
    i = int(e['t'] * SR); j = min(N, i + len(x)); vo[i:j] += x[:j - i]
    a = max(0, i - int(.25 * SR)); b = min(N, j + int(.4 * SR)); duck[a:b] = 1
duck = lp(np.convolve(duck, np.ones(int(.3 * SR)) / int(.3 * SR), 'same'), 5)
act = duck > .5
def limit(x, ceil):
    pk = maximum_filter1d(np.abs(x), int(.005 * SR)); g = np.minimum(1, ceil / (pk + 1e-9))
    g = np.minimum.reduce([g, np.roll(g, int(.0025 * SR))]); g = lp(g, 200); return x * np.clip(g, 0, 1)
speech = np.abs(vo) > 10 ** (-40 / 20) * np.abs(vo).max()
vr = np.sqrt(np.mean(vo[np.convolve(speech, np.ones(2400), 'same') > 0] ** 2))
vo = limit(vo, vr * 10 ** (11 / 20))
mus_db = dbfs(mus[act]); vo_db = dbfs(vo[act])
vo *= 10 ** ((mus_db + 9 - vo_db) / 20)           # la voz unos 9 dB sobre la música
mus *= (1 - .4 * duck)[:, None]                    # la música baja ~4 dB bajo la voz
vo2 = verb(st(vo), .05)
mix = mus + vo2 + sfx
pk = lambda x: round(20 * np.log10(np.abs(x).max() + 1e-12), 1)
print('picos mus', pk(mus), 'voz', pk(vo2), 'sfx', pk(sfx), '| rms mus', round(dbfs(mus), 1), 'voz(activa)', round(dbfs(vo2[act]), 1), 'sfx', round(dbfs(sfx), 1))
# silencio real: 24.3 a 26.8 s, sin música ni foley salvo el aire del cuarto
sil = slice(int(24.6 * SR), int(26.8 * SR)); print('rms 24.6-26.8 s:', round(dbfs(mix[sil]), 1), 'dBFS; resto', round(dbfs(mix), 1))
mix = mix / np.abs(mix).max() * .89
os.makedirs(os.path.join(HERE, 'out'), exist_ok=True)
sf.write(os.path.join(HERE, 'out', 'mix.wav'), mix.astype(np.float32), SR, subtype='FLOAT')
print('ok out/mix.wav')
