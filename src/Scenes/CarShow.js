import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import React from "react";

const CarShowScene = (props) => {

    return (<>
        <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
        <color args={[0, 0, 0]} attach="background" />
        <spotLight 
            color={[1, .25, .7]} 
            intensity={1.5} 
            angle={.6} 
            penumbra={.5} 
            position={[5,5,0]} 
            castShadow
            shadowBias={-.0001} 
        />

        <spotLight 
            color={[.14, .5, 1]} 
            intensity={2} 
            angle={.6} 
            penumbra={.5} 
            position={[-5,5,0]} 
            castShadow
            shadowBias={-.0001} 
        />
        
    </>)
}

export default CarShowScene;