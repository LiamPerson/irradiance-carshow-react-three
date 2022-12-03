import { useFrame } from "@react-three/fiber";
import { useRef } from "react"
import { Color } from "three";

const Rings = () => {
    const itemsRef = useRef([]);

    useFrame(state => {
        let elapsed = state.clock.getElapsedTime();
        // Go through each ring and set the position
        for(let i = 0; i < itemsRef.current.length; i++) {
            let mesh = itemsRef.current[i];
            // Move rings over time, looping back to start position at the end of their cycle infinitely
            // clamping at (+3.5 Z) such that the next step of (+3.5 Z) is (-3.5 Z)
            let z = (i - 7) * 3.5 + ((elapsed * .4) % 3.5) * 2; 
            mesh.position.set(0, 0, -z); // Set the position of each ring

            let dist = Math.abs(z);
            mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);

            let colorScale = 1;
            if (dist > 2) {
                colorScale = 1 - (Math.min(dist, 12) - 2) / 10; // Scale out colours with distance
            }
            colorScale *= .5;

            // Colour odd rings red and even rings blue
            if(i % 2 === 1) {
                mesh.material.emissive = new Color(6, .15, .7).multiplyScalar(colorScale);
            } else {
                mesh.material.emissive = new Color(.1, .7, 3).multiplyScalar(colorScale);
            }
        }
    })

    return (<>
        {Array.from({ length: 14 }).map((v, i) => (
            <mesh
                castShadow
                receiveShadow
                position={[0,0,0]}
                ref={el => itemsRef.current[i] = el}
            >
                <torusGeometry args={[3.35, 0.05, 16, 100]} />
                <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0,0,0]} />
            </mesh>
        ))}
    </>)
}

export default Rings;