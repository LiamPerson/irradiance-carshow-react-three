import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect } from "react";
import { Mesh } from "three";

const Car = () => {

    const gltf = useGLTF(process.env.PUBLIC_URL + "/models/car/scene.gltf");

    useEffect(() => {
        gltf.scene.scale.set(0.005, 0.005, 0.005);
        gltf.scene.position.set(0, -0.035, 0);
        gltf.scene.traverse((object) => {
            if(object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        })
    }, [gltf]);

    useFrame((state, frame) => {
        let t = state.clock.getElapsedTime();
        // Grab tires group
        let group = gltf.scene.children[0].children[0].children[0];
        // Animate tires over time
        group.children[0].rotation.x = t * 2;
        group.children[2].rotation.x = t * 2;
        group.children[4].rotation.x = t * 2;
        group.children[6].rotation.x = t * 2;
    })

    return (
        <primitive object={gltf.scene} />
    )
}

export default Car;