/*
 * @Author: tohsaka888
 * @Date: 2022-09-16 13:53:29
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-16 14:52:02
 * @Description: 请填写简介
 */
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { baseUrl } from 'config/baseUrl'
import { PerspectiveCamera, OrbitControls, Stars } from '@react-three/drei'

const Model = dynamic(() => import('./Model'), { ssr: false })

function LiveBackground() {

  return (
    <Canvas dpr={[1.5, 2]} linear shadows>
      <fog attach="fog" args={['#272730', 16, 30]} />
      <ambientLight intensity={0.8} />
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={75}>
        <pointLight intensity={1} position={[-10, -25, -10]} />
        <spotLight castShadow intensity={2.25} angle={0.2} penumbra={1} position={[-25, 20, -15]} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} />
      </PerspectiveCamera>
      <Suspense fallback={null}>
        <Model url={`${baseUrl}/scene2.glb`} />
      </Suspense>
      <OrbitControls autoRotate enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      <Stars radius={500} depth={50} count={1000} factor={10} />
    </Canvas>
  )
}

export default LiveBackground