import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";

const FloatingGrid = () => {
    const diffuse = useLoader(TextureLoader, "/textures/grid-texture.png"); // useTexture does not work here. IDK why
    useEffect(() => {
        diffuse.wrapS = RepeatWrapping; // Wrap S axis
        diffuse.wrapT = RepeatWrapping; // Wrap T axis
        diffuse.anisotropy = 4;
        diffuse.repeat.set(30,30);
        diffuse.offset.set(0,0);
    }, [diffuse])

    useFrame((state, delta) => {
        let t = -state.clock.getElapsedTime() * 0.68;
        diffuse.offset.set(0,t); // Change offset of the texture of our grid
    })

    return (<mesh rotation-x={-Math.PI * .5} position={[0, 0.01, 0]}>
        <planeGeometry args={[35, 35]} />
        <meshBasicMaterial
            color={[1,1,1]}
            opacity={.15}
            map={diffuse}
            alphaMap={diffuse}
            transparent={true}
        />
    </mesh>)
}

export default FloatingGrid;