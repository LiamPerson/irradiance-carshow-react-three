import React from "react";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

const Ground = () => {
    const [roughness, normal] = useLoader(TextureLoader, [
        "/textures/terrain-roughness.jpg",
        "/textures/terrain-normal.jpg",
    ]);

    useEffect(() => {
        [normal, roughness].forEach(t => {
            t.wrapS = RepeatWrapping;
            t.wrapT = RepeatWrapping;
            t.repeat.set(5,5);
        });

        normal.encoding = LinearEncoding; // Apply linear encoding for non-albedo maps
    }, [normal, roughness])

    useFrame((state, delta) => {
        let t = -state.clock.getElapsedTime() * .128;
        // Offsetting texture coordinates to give the illusion of movement
        roughness.offset.set(0, t); 
        normal.offset.set(0, t);
    })

    return (
        <mesh rotation-x={-Math.PI * .5} castShadow receiveShadow>
            <planeGeometry args={[30, 30]} />
            <MeshReflectorMaterial
                envMapIntensity={0}
                normalMap={normal}
                normalScale={[.15, .15]}
                roughnessMap={roughness}
                dithering={true}
                color={[0.015, 0.015, 0.015]}
                roughness={0.7}
                blur={[1000, 400]}
                mixBlur={30}
                mixStrength={80}
                mixContrast={1}
                resolution={1024}
                mirror={0}
                depthScale={0.01}
                minDepthThreshold={.9}
                maxDepthThreshold={1}
                depthToBlurRatioBias={.25}
                debug={0}
                reflectorOffset={0.2}
            />
        </mesh>
    )
}

export default Ground;