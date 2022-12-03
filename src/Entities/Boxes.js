import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef, useState } from "react";
import { Vector3 } from "three";

export const Box = ({ color }) => {
    const box = useRef();
    const [xRotSpeed] = useState(() => Math.random());
    const [yRotSpeed] = useState(() => Math.random());
    const [scale] = useState(() => Math.pow(Math.random(), 2.0) * .5 + .05);
    
    const position = useMemo(() => {
        // Set a random position on load
        let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + .1, (Math.random() * 2 - 1 ) * 15);
        if(v.x < 0) v.x -= 1.75;
        if(v.x > 0) v.x += 1.75;
        return v;
    }, [])

    useFrame((state, delta) => {
        // Rotate the cubes over time
        box.current.position.set(position.x, position.y, position.z);
        box.current.rotation.x += delta * xRotSpeed;
        box.current.rotation.y += delta * yRotSpeed;
    }, [xRotSpeed, yRotSpeed, position])
    
    return (
        <mesh ref={box} scale={scale} castShadow>
            <boxGeometry args={[1,1,1]} />
            <meshStandardMaterial color={color} envMapIntensity={.15} />
        </mesh>
    )
}

export const Boxes = () => (<>
    {Array.from({ length: 100 }).map((v, i) => <Box color={i % 2 === 0 ? [0.4, .1, .1] : [.05, .15, .4]} />)}
</>)

export default Boxes;