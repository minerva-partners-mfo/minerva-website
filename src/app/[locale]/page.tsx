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

/* Face-center cubets and their outward normals */
const FACE_CENTERS: [number, number, number, number, number, number][] = [
  [0, 0, 1, 0, 0, 0],        // front  — no rotation needed, plane faces +Z by default
  [0, 0, -1, 0, Math.PI, 0], // back
  [1, 0, 0, 0, Math.PI / 2, 0],  // right
  [-1, 0, 0, 0, -Math.PI / 2, 0], // left
  [0, 1, 0, -Math.PI / 2, 0, 0],  // top
  [0, -1, 0, Math.PI / 2, 0, 0],  // bottom
]

export default function HomePage() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  /* ─── Three.js scene ─── */
  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const w = container.clientWidth
    const h = container.clientHeight

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    // Scene + Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 6)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const dir1 = new THREE.DirectionalLight(0xffffff, 0.8)
    dir1.position.set(5, 5, 5)
    scene.add(dir1)
    const dir2 = new THREE.DirectionalLight(0xffffff, 0.3)
    dir2.position.set(-3, -3, 3)
    scene.add(dir2)

    // Group
    const group = new THREE.Group()
    scene.add(group)

    // 27 cubets
    const geo = new THREE.BoxGeometry(0.85, 0.85, 0.85)
    const mat = new THREE.MeshStandardMaterial({ color: 0xB8C0CC, metalness: 0.85, roughness: 0.15 })
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xc5a35a, transparent: true, opacity: 0.4 })
    const edgeGeo = new THREE.EdgesGeometry(geo)

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const mesh = new THREE.Mesh(geo, mat)
          mesh.position.set(x, y, z)
          group.add(mesh)
          const lines = new THREE.LineSegments(edgeGeo, edgeMat)
          lines.position.set(x, y, z)
          group.add(lines)
        }
      }
    }

    // Logo on 6 face centers
    const loader = new THREE.TextureLoader()
    loader.load('/images/logoPNG.png', (texture) => {
      const planeGeo = new THREE.PlaneGeometry(0.45, 0.45)
      FACE_CENTERS.forEach(([px, py, pz, rx, ry, rz]) => {
        const planeMat = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.25,
          color: 0xc5a35a,
        })
        const plane = new THREE.Mesh(planeGeo, planeMat)
        plane.position.set(px * 1 + px * 0, py * 1 + py * 0, pz * 1 + pz * 0)
        // Offset 0.431 outward along the face normal
        plane.position.x += px * 0.431
        plane.position.y += py * 0.431
        plane.position.z += pz * 0.431
        plane.rotation.set(rx, ry, rz)
        group.add(plane)
      })
    })

    // Animation state
    let baseRotY = 0
    let animId = 0
    let mouseX = 0
    let mouseY = 0
    let currentMX = 0
    let currentMY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    const animate = () => {
      animId = requestAnimationFrame(animate)

      const t = Date.now()
      baseRotY += 0.003
      const baseRotX = Math.sin(t * 0.0003) * 0.15

      // Lerp mouse influence
      currentMX += (mouseX - currentMX) * 0.03
      currentMY += (mouseY - currentMY) * 0.03

      group.rotation.y = baseRotY + currentMX * 0.4
      group.rotation.x = baseRotX - currentMY * 0.3

      // Floating
      group.position.y = Math.sin(t * 0.0008) * 0.12

      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      edgeMat.dispose()
      edgeGeo.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  /* ─── Login ─── */
  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim() || loading) return
    setLoading(true)
    setError('')
    try {
      const { error: err } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      })
      if (err) { setError('Credenziali non valide.'); setLoading(false); return }
      window.location.href = '/portal'
    } catch {
      setError('Errore di connessione.')
      setLoading(false)
    }
  }, [email, password, loading])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

        .lp-input {
          width: 260px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          padding: 12px 14px;
          color: #fff;
          font-family: 'Lora', serif;
          font-size: 0.75rem;
          outline: none;
          transition: border-color .3s;
          box-sizing: border-box;
        }
        .lp-input::placeholder { color: rgba(255,255,255,0.2); }
        .lp-input:focus { border-color: rgba(197,163,90,0.4); }

        .lp-btn {
          width: 260px;
          background: rgba(197,163,90,0.08);
          border: 1px solid rgba(197,163,90,0.2);
          border-radius: 6px;
          padding: 12px;
          color: #c5a35a;
          font-family: 'Lora', serif;
          font-size: 0.6rem;
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
          font-size: 0.6rem;
          color: rgba(197,163,90,0.3);
          text-decoration: none;
          transition: color .3s;
        }
        .ft-legal:hover { color: #c5a35a; }

        @media (max-width: 768px) {
          .cube-mount { width: 280px !important; height: 280px !important; }
          .ft-outer   { padding: 40px 24px 24px !important; }
          .ft-inner   { flex-direction: column !important; gap: 32px !important; }
          .ft-cols    { flex-wrap: wrap !important; gap: 24px 32px !important; }
          .ft-col     { min-width: 120px; }
        }
      `}</style>

      {/* ════════════════ HERO ════════════════ */}
      <section
        style={{
          minHeight: '100vh',
          background: '#0D1520',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 9999,
          overflow: 'hidden',
        }}
      >
        {/* Three.js canvas mount */}
        <div
          ref={mountRef}
          className="cube-mount"
          style={{ width: 400, height: 400 }}
        />

        {/* Logo + brand */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 30 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logoPNG.png" alt="Minerva Partners" width={40} height={40} style={{ opacity: 0.9 }} />
          <p style={{ fontFamily: "'Lora', serif", color: '#fff', fontSize: '1.1rem', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', margin: '10px 0 0', textAlign: 'center' }}>
            MINERVA PARTNERS
          </p>
          <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', color: '#c5a35a', fontSize: '0.7rem', margin: '4px 0 0', textAlign: 'center' }}>
            L&apos;eccellenza senza compromessi
          </p>
        </div>

        {/* Frase */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 25 }}>
          <p style={{ fontFamily: "'Lora', serif", fontWeight: 400, color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', margin: 0, textAlign: 'center' }}>
            Il meglio per te, solo quando serve.
          </p>
          <p style={{ fontFamily: "'Lora', serif", fontWeight: 400, color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', margin: '4px 0 0', textAlign: 'center' }}>
            Sia a livello di risorse che di possibilità.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 35, gap: 10 }}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" autoComplete="email" className="lp-input" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" autoComplete="current-password" className="lp-input" />
          <button type="submit" disabled={loading} className="lp-btn">
            {loading ? '...' : 'Accedi'}
          </button>
          {error && (
            <p style={{ color: '#ef4444', fontSize: '0.65rem', fontFamily: "'Lora', serif", marginTop: 4 }}>{error}</p>
          )}
        </form>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="ft-outer" style={{ background: '#080c14', padding: '60px 80px 30px', width: '100%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="ft-inner" style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Left */}
            <div style={{ width: 200, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logoPNG.png" alt="Minerva Partners" width={28} height={28} style={{ opacity: 0.5 }} />
              <p style={{ fontFamily: "'Lora', serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', marginTop: 10 }}>
                Minerva Partners S.r.l.
              </p>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '0.55rem', color: 'rgba(255,255,255,0.12)', marginTop: 4 }}>
                &copy; 2026 Minerva Partners
              </p>
            </div>

            {/* Columns */}
            <div className="ft-cols" style={{ display: 'flex', gap: 50 }}>
              {COLS.map(col => (
                <div key={col.title} className="ft-col">
                  <p style={{ fontFamily: "'Lora', serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, marginTop: 0 }}>
                    {col.title}
                  </p>
                  {col.items.map(item => (
                    <div key={item} style={{ fontFamily: "'Lora', serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', lineHeight: 2.4, cursor: 'default' }}>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid rgba(255,255,255,0.04)', marginTop: 40 }} />
          <p style={{ marginTop: 16, marginBottom: 0 }}>
            <a href="#" className="ft-legal">Privacy</a>
            <span style={{ color: 'rgba(255,255,255,0.1)', margin: '0 8px', fontSize: '0.5rem' }}>&bull;</span>
            <a href="#" className="ft-legal">Copyright</a>
          </p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '0.5rem', color: 'rgba(255,255,255,0.06)', lineHeight: 1.7, maxWidth: 700, marginTop: 20 }}>
            The content on this website is provided for informational purposes. Minerva Partners
            operates with care, discipline and rigor, but does not guarantee that the information
            is always complete, accurate or suitable for every specific situation. Any decision
            based on such information remains the sole responsibility of the user.
          </p>
        </div>
      </footer>
    </>
  )
}
