'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import * as THREE from 'three'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const COLS = [
  { title: 'Il Modello', items: ['Il Problema', 'Come Funziona', 'Posizionamento', 'Settori e Player'] },
  { title: 'Servizi', items: ['Soluzioni', 'Minerva Hub', 'Ecosistema', 'Abilitatori'] },
  { title: 'Fiducia', items: ['Il Codice', 'VERITAS', 'Trasparenza', 'Selezione'] },
  { title: 'Network', items: ['Eventi', 'Point Zero', 'Club Deal', 'Next Gen'] },
  { title: 'Chi Siamo', items: ['Il Pensiero', 'Strategia', 'Management', 'Contatti'] },
]

const FACE_CENTERS: [number, number, number, number, number, number][] = [
  [0, 0, 1, 0, 0, 0],
  [0, 0, -1, 0, Math.PI, 0],
  [1, 0, 0, 0, Math.PI / 2, 0],
  [-1, 0, 0, 0, -Math.PI / 2, 0],
  [0, 1, 0, -Math.PI / 2, 0, 0],
  [0, -1, 0, Math.PI / 2, 0, 0],
]

export default function HomePage() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const container = canvasRef.current
    if (!container) return

    const w = container.clientWidth
    const h = container.clientHeight

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.set(0, 0, 6)

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const d1 = new THREE.DirectionalLight(0xffffff, 0.8); d1.position.set(5, 5, 5); scene.add(d1)
    const d2 = new THREE.DirectionalLight(0xffffff, 0.3); d2.position.set(-3, -3, 3); scene.add(d2)

    const group = new THREE.Group()
    scene.add(group)

    const geo = new THREE.BoxGeometry(0.85, 0.85, 0.85)
    const mat = new THREE.MeshStandardMaterial({ color: 0xB8C0CC, metalness: 0.85, roughness: 0.15 })
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xc5a35a, transparent: true, opacity: 0.4 })
    const edgeGeo = new THREE.EdgesGeometry(geo)

    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); group.add(m)
          const l = new THREE.LineSegments(edgeGeo, edgeMat); l.position.set(x, y, z); group.add(l)
        }

    const loader = new THREE.TextureLoader()
    loader.load('/images/logoPNG.png', (texture) => {
      const pg = new THREE.PlaneGeometry(0.45, 0.45)
      FACE_CENTERS.forEach(([px, py, pz, rx, ry, rz]) => {
        const pm = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.25, color: 0xc5a35a })
        const plane = new THREE.Mesh(pg, pm)
        plane.position.set(px + px * 0.431, py + py * 0.431, pz + pz * 0.431)
        plane.rotation.set(rx, ry, rz)
        group.add(plane)
      })
    })

    let baseRotY = 0, animId = 0, mouseX = 0, mouseY = 0, curMX = 0, curMY = 0

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = Date.now()
      baseRotY += 0.003
      curMX += (mouseX - curMX) * 0.03
      curMY += (mouseY - curMY) * 0.03
      group.rotation.y = baseRotY + curMX * 0.4
      group.rotation.x = Math.sin(t * 0.0003) * 0.15 - curMY * 0.3
      group.position.y = Math.sin(t * 0.0008) * 0.12
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      renderer.dispose(); geo.dispose(); mat.dispose(); edgeMat.dispose(); edgeGeo.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim() || loading) return
    setLoading(true); setError('')
    try {
      const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password: password.trim() })
      if (err) { setError('Credenziali non valide.'); setLoading(false); return }
      window.location.href = '/portal'
    } catch { setError('Errore di connessione.'); setLoading(false) }
  }, [email, password, loading])

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#0D1520', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        .lp-in {
          width:240px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
          border-radius:5px; padding:10px 12px; color:#fff; font-family:'Lora',serif; font-size:0.7rem;
          outline:none; transition:border-color .3s; box-sizing:border-box;
        }
        .lp-in::placeholder{color:rgba(255,255,255,0.18)}
        .lp-in:focus{border-color:rgba(197,163,90,0.4)}
        .lp-bt {
          width:240px; background:rgba(197,163,90,0.08); border:1px solid rgba(197,163,90,0.2);
          border-radius:5px; padding:10px; color:#c5a35a; font-family:'Lora',serif; font-size:0.55rem;
          text-transform:uppercase; letter-spacing:0.2em; cursor:pointer; transition:all .3s; box-sizing:border-box;
        }
        .lp-bt:hover:not(:disabled){background:rgba(197,163,90,0.15);border-color:rgba(197,163,90,0.4)}
        .lp-bt:disabled{cursor:wait;opacity:.4}
        .ft-lk{font-family:'Lora',serif;font-size:0.45rem;color:rgba(197,163,90,0.25);text-decoration:none;transition:color .3s}
        .ft-lk:hover{color:#c5a35a}
        @media(max-width:768px){
          .hero-main{flex-direction:column!important}
          .hero-cube{width:250px!important;height:250px!important}
          .hero-right{padding:20px!important}
          .ft-cols{display:none!important}
          .ft-bottom{flex-direction:column!important;gap:6px!important;align-items:flex-start!important}
        }
      `}</style>

      {/* ══ MAIN: two columns ══ */}
      <div className="hero-main" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>

        {/* Left — Cube */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div ref={canvasRef} className="hero-cube" style={{ width: 350, height: 350 }} />
        </div>

        {/* Right — Logo + text + form */}
        <div className="hero-right" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logoPNG.png" alt="Minerva" width={45} height={45} style={{ opacity: 0.9 }} />
          <p style={{ fontFamily: "'Lora',serif", color: '#fff', fontSize: '1.1rem', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', margin: '10px 0 0', textAlign: 'center' }}>
            Minerva Partners
          </p>
          <p style={{ fontFamily: "'Lora',serif", fontStyle: 'italic', color: '#c5a35a', fontSize: '0.65rem', margin: '4px 0 0', textAlign: 'center' }}>
            L&apos;eccellenza senza compromessi
          </p>
          <p style={{ fontFamily: "'Lora',serif", color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', margin: '20px 0 0', textAlign: 'center' }}>
            Il meglio per te, solo quando serve.
          </p>
          <p style={{ fontFamily: "'Lora',serif", color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', margin: '3px 0 0', textAlign: 'center' }}>
            Sia a livello di risorse che di possibilità.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 25, gap: 8 }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" autoComplete="email" className="lp-in" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" autoComplete="current-password" className="lp-in" />
            <button type="submit" disabled={loading} className="lp-bt">{loading ? '...' : 'Accedi'}</button>
            {error && <p style={{ color: '#ef4444', fontSize: '0.55rem', fontFamily: "'Lora',serif", marginTop: 2 }}>{error}</p>}
          </form>
        </div>
      </div>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: '#080c14', padding: '20px 50px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logoPNG.png" alt="M" width={20} height={20} style={{ opacity: 0.4 }} />
          <span style={{ fontFamily: "'Lora',serif", fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)' }}>Minerva Partners S.r.l.</span>
          <span style={{ fontFamily: "'Lora',serif", fontSize: '0.5rem', color: 'rgba(255,255,255,0.1)' }}>&copy; 2026</span>
        </div>
        {/* Columns */}
        <div className="ft-cols" style={{ display: 'flex', gap: 35 }}>
          {COLS.map(col => (
            <div key={col.title}>
              <p style={{ fontFamily: "'Lora',serif", fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, marginTop: 0 }}>{col.title}</p>
              {col.items.map(item => (
                <div key={item} style={{ fontFamily: "'Lora',serif", fontSize: '0.5rem', color: 'rgba(255,255,255,0.15)', lineHeight: 1.8, cursor: 'default' }}>{item}</div>
              ))}
            </div>
          ))}
        </div>
      </footer>

      {/* ══ BOTTOM BAR ══ */}
      <div className="ft-bottom" style={{ background: '#080c14', padding: '0 50px 10px', borderTop: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ paddingTop: 8 }}>
          <a href="#" className="ft-lk">Privacy</a>
          <span style={{ color: 'rgba(255,255,255,0.08)', margin: '0 6px', fontSize: '0.4rem' }}>&bull;</span>
          <a href="#" className="ft-lk">Copyright</a>
        </span>
        <p style={{ fontFamily: "'Lora',serif", fontSize: '0.4rem', color: 'rgba(255,255,255,0.05)', maxWidth: 600, textAlign: 'right', margin: 0, paddingTop: 8 }}>
          The content on this website is provided for informational purposes. Minerva Partners operates with care, discipline and rigor, but does not guarantee that the information is always complete, accurate or suitable for every specific situation.
        </p>
      </div>
    </div>
  )
}
