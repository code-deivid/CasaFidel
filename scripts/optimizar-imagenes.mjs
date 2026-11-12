// Genera versiones WebP en varios anchos a partir de las fotos originales (solo WebP).
// Requisito: tener ffmpeg instalado y disponible en el PATH.
// Uso: npm run images
//
// Los originales viven en public/images/restaurante (no se publican: vite.config.ts
// los excluye del build). Para añadir una foto: añádela a la lista FOTOS, ejecuta
// el script y regístrala en src/data/images.ts con el mismo `nombre`.

import { execFileSync } from 'node:child_process'
import { mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const CARPETA_ORIGEN = 'public/images/restaurante'
const CARPETA_DESTINO = 'public/images/fotos'

// `anchos` sustituye a la lista general cuando una imagen se muestra siempre
// pequeña (el logotipo de Tío Pedro), y entonces no se genera el ancho original.
// `fondoTransparente` vuelve transparente ese color de fondo (WebP con canal alfa): un logotipo con recuadro claro sobre el suelo de la web se ve
// como una pegatina.
const FOTOS = [
  { origen: 'fachada.webp', nombre: 'fachada', anchoOriginal: 1448 },
  { origen: 'comedor-01.webp', nombre: 'comedor-1', anchoOriginal: 1448 },
  { origen: 'comedor-02.webp', nombre: 'comedor-2', anchoOriginal: 1448 },
  { origen: 'sala-bar-01.webp', nombre: 'barra-1', anchoOriginal: 1448 },
  { origen: 'sala-bar-02.webp', nombre: 'barra-2', anchoOriginal: 1448 },
  { origen: 'personas.webp', nombre: 'personas', anchoOriginal: 1411 },
  { origen: 'tio-pedro.webp', nombre: 'tio-pedro', anchos: [240, 480, 720], fondoTransparente: '0xFBF9F5' },
]

// Además de estos anchos se genera siempre el ancho original.
const ANCHOS = [480, 800, 1200]

mkdirSync(CARPETA_DESTINO, { recursive: true })

for (const foto of FOTOS) {
  const rutaOrigen = join(CARPETA_ORIGEN, foto.origen)
  if (!existsSync(rutaOrigen)) {
    console.warn(`No se encuentra ${rutaOrigen}; se omite.`)
    continue
  }

  const anchos = foto.anchos ?? [...ANCHOS.filter((ancho) => ancho < foto.anchoOriginal), foto.anchoOriginal]

  for (const ancho of anchos) {
    const base = join(CARPETA_DESTINO, `${foto.nombre}-${ancho}`)
    const escala = `scale=${ancho}:-2:flags=lanczos`

    if (foto.fondoTransparente) {
      execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', rutaOrigen, '-vf',
        `colorkey=${foto.fondoTransparente}:0.08:0.06,${escala},format=yuva420p`,
        '-c:v', 'libwebp', '-quality', '85', `${base}.webp`])
      console.log(`✓ ${base}.webp (transparente)`)
      continue
    }

    execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', rutaOrigen, '-vf', escala,
      '-c:v', 'libwebp', '-quality', '78', `${base}.webp`])

    console.log(`✓ ${base}.webp`)
  }
}
