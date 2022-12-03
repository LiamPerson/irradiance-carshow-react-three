import React from "react";
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Ground from "../Entities/Ground";
import Car from "../Entities/Car";
import Rings from "../Entities/Rings";
import Boxes from "../Entities/Boxes";
import { Bloom, ChromaticAberration, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const CarShowScene = (props) => {

    return (<>
        <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
        <color args={[0, 0, 0]} attach="background" />

        <CubeCamera resolution={256} frames={Infinity}>
            {(texture) => (
                <>
                    <Environment map={texture} />
                    <Car />
                </>
            )}
        </CubeCamera>

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

        <Rings />
        <Ground />
        <Boxes />
        
        <EffectComposer>
            <DepthOfField
                focusDistance={.0035}
                focalLength={0.01}
                bokehScale={3}
                height={480}
            />
            <Bloom
                blendFunction={BlendFunction.ADD}
                intensity={0.3}
                width={300}
                height={300}
                kernelSize={5}
                luminanceThreshold={.15} // How bright a pixel needs to be to interact with the bloom effect. Raise this value to mask out darker elements in the scene.
                luminanceSmoothing={.025} // smoothness of the luminance threshold. Range is [0, 1]
            />
            <ChromaticAberration
                blendFunction={BlendFunction.NORMAL} // blend mode
                offset={[.0005, .0012]} // Color offset
            />
        </EffectComposer>

    </>)
}

export default CarShowScene;