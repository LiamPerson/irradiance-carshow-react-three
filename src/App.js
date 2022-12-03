import React, { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import CarShow from './Scenes/CarShow';

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
