import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import CarShow from './Scenes/CarShow';

function App() {
  return (
    <Suspense>
      <Canvas>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
