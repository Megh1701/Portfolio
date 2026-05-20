import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import arrow from '/arrow.png'
import {
  Canvas,
  extend,
  useThree,
  useFrame
} from '@react-three/fiber'

import {
  useGLTF,
  useTexture
} from '@react-three/drei'

import myimage from '../assets/F4B515A5-1794-402D-998E-03FAEF4AB781_1_201_a.jpeg'
import { RoundedPlaneGeometry } from 'maath/geometry'
import { useTheme } from '../context/ThemeContext'

import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RapierRigidBody
} from '@react-three/rapier'

import {
  MeshLineGeometry,
  MeshLineMaterial
} from 'meshline'

extend({
  MeshLineGeometry,
  MeshLineMaterial,
  RoundedPlaneGeometry
})

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: any
    meshLineMaterial: any
    roundedPlaneGeometry: any
  }
}
export default function EventBadge() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.02 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full z-100">
      {isInView ? (
        <Canvas
          dpr={[1, 2]} // Limit to 2 for high performance on Retina displays
          camera={{
            position: [0, 0, 18],
            fov: 25
          }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance' // Hint dedicated GPU usage
          }}
          style={{
            background: 'transparent'
          }}
        >
          <ambientLight intensity={1.5} />

          <directionalLight
            position={[-0.25, -0.55, 5]}
            intensity={2}
          />

          <Physics
            interpolate
            gravity={[0, -40, 0]}
            timeStep={1 / 60}
          >
            <Band />
          </Physics>
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-neutral-400/35 uppercase tracking-widest">
          Badge Paused
        </div>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 select-none pointer-events-none">
        <img
          src={arrow}
          alt="arrow"
          style={{ filter: 'invert(58%) sepia(84%) saturate(415%) hue-rotate(113deg) brightness(96%) contrast(94%)' }}
          className="w-20 h-20 rotate-[-65deg] object-contain"
        />
        <span className="text-sm font-semibold tracking-wide text-emerald-400">
         You can Drag me!!
        </span>
      </div>

    </div>
  )
}
function Band({
  maxSpeed = 50,
  minSpeed = 10
}) {
  const { resolvedTheme } = useTheme()
  const band = useRef<THREE.Mesh>(null!)

  const fixed = useRef<RapierRigidBody>(null!)
  const j1 = useRef<RapierRigidBody>(null!)
  const j2 = useRef<RapierRigidBody>(null!)
  const j3 = useRef<RapierRigidBody>(null!)
  const card = useRef<RapierRigidBody>(null!)

  const vec = new THREE.Vector3()
  const dir = new THREE.Vector3()

  // IMPORTANT
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()

  const smoothEnd = useRef(
    new THREE.Vector3()
  )

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,

    // ORIGINAL VALUES
    angularDamping: 2,
    linearDamping: 2
  }

  const { nodes } = useGLTF(
    'https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb'
  ) as any


  const cardTexture = useTexture(myimage)

  // =========================
  // TEXTURE SETTINGS
  // =========================

  cardTexture.colorSpace =
    THREE.SRGBColorSpace

  cardTexture.generateMipmaps = false

  cardTexture.minFilter =
    THREE.LinearFilter

  cardTexture.magFilter =
    THREE.LinearFilter

  cardTexture.anisotropy = 16

  cardTexture.needsUpdate = true


  const { width, height } = useThree(
    (state) => state.size
  )

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
      ])
  )

  curve.curveType = 'chordal'

  const [dragged, drag] = useState<
    false | THREE.Vector3
  >(false)

  const [hovered, hover] =
    useState(false)

  // =========================
  // JOINTS
  // =========================

  useRopeJoint(
    fixed,
    j1,
    [[0, 0, 0], [0, 0, 0], 0.9]
  )

  useRopeJoint(
    j1,
    j2,
    [[0, 0, 0], [0, 0, 0], 0.9]
  )

  useRopeJoint(
    j2,
    j3,
    [[0, 0, 0], [0, 0, 0], 0.9]
  )

  useSphericalJoint(
    j3,
    card,
    [[0, 0, 0], [0, 1.3, 0]]
  )

  // =========================
  // CURSOR
  // =========================

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor =
        dragged ? 'grabbing' : 'grab'

      return () => {
        document.body.style.cursor = 'auto'
      }
    }
  }, [hovered, dragged])

  // =========================
  // FRAME LOOP
  // =========================

  useFrame((state, delta) => {
    // =========================
    // DRAGGING
    // =========================

    if (dragged) {
      vec
        .set(
          state.pointer.x,
          state.pointer.y,
          0.5
        )
        .unproject(state.camera)

      dir
        .copy(vec)
        .sub(state.camera.position)
        .normalize()

      vec.add(
        dir.multiplyScalar(
          state.camera.position.length()
        )
      )

      ;[
        card,
        j1,
        j2,
        j3,
        fixed
      ].forEach((ref) =>
        ref.current?.wakeUp()
      )

      card.current?.setNextKinematicTranslation(
        {
          x: vec.x - dragged.x,
          y: vec.y - dragged.y,
          z: vec.z - dragged.z
        }
      )
    }

    if (!fixed.current) return

    // =========================
    // SMOOTH ROPE
    // =========================

    ;[j1, j2].forEach((ref) => {
      if (!(ref.current as any).lerped) {
        ;(ref.current as any).lerped =
          new THREE.Vector3().copy(
            ref.current.translation()
          )
      }

      const clampedDistance = Math.max(
        0.1,
        Math.min(
          1,
          (
            ref.current as any
          ).lerped.distanceTo(
            ref.current.translation()
          )
        )
      )

      ;(ref.current as any).lerped.lerp(
        ref.current.translation(),
        delta *
          (minSpeed +
            clampedDistance *
              (maxSpeed - minSpeed))
      )
    })

    // =========================
    // ROPE END
    // =========================

    smoothEnd.current.lerp(
      j3.current.translation(),
      0.25
    )

    // =========================
    // UPDATE CURVE
    // =========================

    curve.points[0].copy(
      smoothEnd.current
    )

    curve.points[1].copy(
      (j2.current as any).lerped
    )

    curve.points[2].copy(
      (j1.current as any).lerped
    )

    curve.points[3].copy(
      fixed.current.translation()
    )

    ;(
      band.current.geometry as any
    ).setPoints(curve.getPoints(32))

    // =========================
    // STABILIZATION FIX
    // =========================

    ang.copy(card.current.angvel())

    rot.copy(card.current.rotation())

    card.current.setAngvel({
      x: ang.x,
      y: ang.y - rot.y * 0.25,
      z: ang.z
    },true)
  })

  return (
    <>
      <group position={[0, 4, 0]}>
        {/* FIXED */}

        <RigidBody
          ref={fixed}
          {...segmentProps}
          type="fixed"
        />

        {/* JOINTS */}

        <RigidBody
          position={[0.5, 0, 0]}
          ref={j1}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[1, 0, 0]}
          ref={j2}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[1.5, 0, 0]}
          ref={j3}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* CARD */}

        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          {...segmentProps}
          type={
            dragged
              ? 'kinematicPosition'
              : 'dynamic'
          }
        >
          <CuboidCollider
            args={[0.8, 1.125, 0.03]}
          />

          <group
            scale={2.25}
            position={[0, -1.1, -0.05]}
            onPointerOver={() =>
              hover(true)
            }
            onPointerOut={() =>
              hover(false)
            }
            onPointerUp={(e) => {
              ;(
                e.target as Element
              ).releasePointerCapture(
                e.pointerId
              )

              drag(false)
            }}
            onPointerDown={(e) => {
              ;(
                e.target as Element
              ).setPointerCapture(
                e.pointerId
              )

              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(
                    vec.copy(
                      card.current.translation()
                    )
                  )
              )
            }}
          >
            {/* FRONT */}

            <mesh
              position={[0, 0.38, 0.02]}
              renderOrder={2}
            >
              <roundedPlaneGeometry
                args={[0.94, 1.31, 0.12, 8]}
              />

              <meshPhysicalMaterial
                map={cardTexture}
                roughness={0}
                metalness={0}
                depthWrite={false}
                side={THREE.FrontSide}
              />
            </mesh>

            {/* BACK */}

            <mesh
              position={[0, 0.38, -0.02]}
              rotation={[0, Math.PI, 0]}
              renderOrder={1}
            >
              <roundedPlaneGeometry
                args={[0.94, 1.31, 0.12, 8]}
              />

              <meshPhysicalMaterial
                map={cardTexture}
                roughness={0}
                metalness={0}
                depthWrite={false}
                side={THREE.FrontSide}
              />
            </mesh>

            {/* METAL CLAMP */}
            <mesh
              geometry={nodes.clamp.geometry}
            >
              <meshStandardMaterial
                color={resolvedTheme === 'dark' ? '#ffffff' : '#444444'}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
          </group>
        </RigidBody>
        
      </group>


      {/* ROPE */}

     {/* ROPE */}

<mesh ref={band}>
  <meshLineGeometry />

  <meshLineMaterial
    color={resolvedTheme === 'dark' ? 'white' : 'black'}
    resolution={[width, height]}
    lineWidth={0.2}
    transparent
    depthWrite={false}
  />
</mesh>
    </>
  )
}