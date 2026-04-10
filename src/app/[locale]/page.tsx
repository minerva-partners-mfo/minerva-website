'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useTranslations, useLocale } from 'next-intl'
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
  { title: 'Chi Siamo', items: ['Il Pensiero', 'Management', 'Contatti'] },
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
  const ht = useTranslations('homepage')
  const locale = useLocale()
  const mountRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const container = mountRef.current
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
    const dir1 = new THREE.DirectionalLight(0xffffff, 0.8)
    dir1.position.set(5, 5, 5)
    scene.add(dir1)
    const dir2 = new THREE.DirectionalLight(0xffffff, 0.3)
    dir2.position.set(-3, -3, 3)
    scene.add(dir2)

    const group = new THREE.Group()
    scene.add(group)

    const geo = new THREE.BoxGeometry(0.85, 0.85, 0.85)
    const mat = new THREE.MeshStandardMaterial({ color: 0xB8C0CC, metalness: 0.85, roughness: 0.15 })
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xc5a35a, transparent: true, opacity: 0.4 })
    const edgeGeo = new THREE.EdgesGeometry(geo)

    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          const mesh = new THREE.Mesh(geo, mat)
          mesh.position.set(x, y, z)
          group.add(mesh)
          const lines = new THREE.LineSegments(edgeGeo, edgeMat)
          lines.position.set(x, y, z)
          group.add(lines)
        }

    const loader = new THREE.TextureLoader()
    loader.load('/images/logo.png', (texture) => {
      const planeGeo = new THREE.PlaneGeometry(0.45, 0.45)
      FACE_CENTERS.forEach(([px, py, pz, rx, ry, rz]) => {
        const planeMat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.25, color: 0xc5a35a })
        const plane = new THREE.Mesh(planeGeo, planeMat)
        plane.position.set(px + px * 0.431, py + py * 0.431, pz + pz * 0.431)
        plane.rotation.set(rx, ry, rz)
        group.add(plane)
      })
    })

    let baseRotY = 0, animId = 0, mouseX = 0, mouseY = 0, currentMX = 0, currentMY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = Date.now()
      baseRotY += 0.003
      currentMX += (mouseX - currentMX) * 0.03
      currentMY += (mouseY - currentMY) * 0.03
      group.rotation.y = baseRotY + currentMX * 0.4
      group.rotation.x = Math.sin(t * 0.0003) * 0.15 - currentMY * 0.3
      group.position.y = Math.sin(t * 0.0008) * 0.12
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
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
      window.location.href = `/${locale}/come-funziona`
    } catch { setError('Errore di connessione.'); setLoading(false) }
  }, [email, password, loading])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

        .lp-input {
          width: 280px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          padding: 13px 16px;
          color: #fff;
          font-family: 'Lora', serif;
          font-size: 0.85rem;
          outline: none;
          transition: border-color .3s;
          box-sizing: border-box;
        }
        .lp-input::placeholder { color: rgba(255,255,255,0.2); }
        .lp-input:focus { border-color: rgba(197,163,90,0.4); }

        .lp-btn {
          width: 280px;
          background: rgba(197,163,90,0.08);
          border: 1px solid rgba(197,163,90,0.2);
          border-radius: 6px;
          padding: 13px;
          color: #c5a35a;
          font-family: 'Lora', serif;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          cursor: pointer;
          transition: all .3s;
          box-sizing: border-box;
        }
        .lp-btn:hover:not(:disabled) {
          background: rgba(197,163,90,0.15);
          border-color: rgba(197,163,90,0.4);
        }
        .lp-btn:disabled { cursor: wait; opacity: .45; }

        .ft-legal {
          font-family: 'Lora', serif;
          font-size: 0.7rem;
          color: rgba(197,163,90,0.3);
          text-decoration: none;
          transition: color .3s;
        }
        .ft-legal:hover { color: #c5a35a; }

        @media (max-width: 900px) {
          .hero-row { flex-direction: column !important; }
          .hero-col-left { min-height: auto !important; }
          .hero-col-right { min-height: auto !important; padding: 30px 20px !important; }
          .cube-mount { width: 280px !important; height: 280px !important; }
          .ft-outer   { padding: 40px 24px 24px !important; }
          .ft-inner   { flex-direction: column !important; gap: 32px !important; }
          .ft-cols    { flex-wrap: wrap !important; gap: 24px 32px !important; }
          .ft-col     { min-width: 120px; }
        }
      `}</style>

      {/* ════════════════ HERO — two columns ════════════════ */}
      <section style={{ background: '#0D1520', position: 'relative', zIndex: 9999 }}>
        <div
          className="hero-row"
          style={{
            display: 'flex',
            maxWidth: 1100,
            margin: '0 auto',
            minHeight: '70vh',
          }}
        >
          {/* Left — Cube centered */}
          <div
            className="hero-col-left"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '70vh',
            }}
          >
            <div ref={mountRef} className="cube-mount" style={{ width: 400, height: 400 }} />
          </div>

          {/* Right — Logo + form centered */}
          <div
            className="hero-col-right"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '70vh',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-minerva.png" alt="Minerva Partners" width={280} style={{ height: 'auto', marginBottom: 30 }} />

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" autoComplete="email" className="lp-input" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" autoComplete="current-password" className="lp-input" />
              <button type="submit" disabled={loading} className="lp-btn">
                {loading ? '...' : ht('login')}
              </button>
              {error && (
                <p style={{ color: '#ef4444', fontSize: '0.7rem', fontFamily: "'Lora', serif", marginTop: 4 }}>{error}</p>
              )}
            </form>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', marginTop: 20, fontStyle: 'italic' }}>
              {ht('introduced')}
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="ft-outer" style={{ background: '#131E33', padding: '30px 80px 18px', width: '100%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="ft-inner" style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Left */}
            <div style={{ width: 220, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-minerva.png" alt="M" width={30} style={{ height: 'auto', opacity: 0.8 }} />
              <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginTop: 12 }}>
                Minerva Partners S.r.l.
              </p>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
                &copy; 2026 Minerva Partners
              </p>
            </div>

            {/* Columns */}
            <div className="ft-cols" style={{ display: 'flex', gap: 50 }}>
              {COLS.map(col => (
                <div key={col.title} className="ft-col">
                  <p style={{ fontFamily: "'Lora', serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14, marginTop: 0 }}>
                    {col.title}
                  </p>
                  {col.items.map(item => (
                    <div key={item} style={{ fontFamily: "'Lora', serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', lineHeight: 2.2, cursor: 'default' }}>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid rgba(255,255,255,0.12)', marginTop: 20 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10 }}>
            <p style={{ margin: 0 }}>
              <a href="#" className="ft-legal">Privacy</a>
              <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 8px', fontSize: '0.55rem' }}>&bull;</span>
              <a href="#" className="ft-legal">Copyright</a>
            </p>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, maxWidth: 550, textAlign: 'right', margin: 0 }}>
              The content on this website is provided for informational purposes. Minerva Partners
              operates with care, discipline and rigor, but does not guarantee that the information
              is always complete, accurate or suitable for every specific situation. Any decision
              based on such information remains the sole responsibility of the user.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
