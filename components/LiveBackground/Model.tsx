/*
 * @Author: tohsaka888
 * @Date: 2022-09-16 14:04:15
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-16 14:50:09
 * @Description: 加载模型
 */

import React from 'react'
import { useGLTF } from '@react-three/drei'

type Props = {
  url: string;
}

function Model({ url }: Props) {
  const model: any = useGLTF(url)
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -7, 0]} scale={7}>
      <group rotation={[Math.PI / 13.5, -Math.PI / 5.8, Math.PI / 5.6]}>
        <mesh receiveShadow castShadow geometry={model.nodes.planet001_1.geometry} material={model.nodes.planet001_1.material} />
        <mesh geometry={model.nodes.planet001_2.geometry} material={model.nodes.planet001_2.material} />
      </group>
    </group>
  )
}
export default Model
