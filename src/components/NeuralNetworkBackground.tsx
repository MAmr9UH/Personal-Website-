import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

// Extend Three.js materials for React Three Fiber
extend({ PointMaterial });

// Neural Network Nodes Component
const NeuralNodes = () => {
  const ref = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.Group>(null);
  
  // Generate neural network structure
  const { positions, connections } = useMemo(() => {
    const nodePositions = new Float32Array(60 * 3); // 60 nodes
    const nodeConnections: Array<[number, number]> = [];
    
    // Create layered neural network structure (left side)
    const layers = [8, 12, 8, 4]; // 4 layers with different node counts
    let nodeIndex = 0;
    const layerNodes: number[][] = [];
    
    layers.forEach((nodeCount, layerIndex) => {
      const layerNodeIndices: number[] = [];
      const x = -6 + layerIndex * 2; // Position layers from left to center
      
      for (let i = 0; i < nodeCount; i++) {
        const y = (i - nodeCount / 2) * 1.5;
        const z = (Math.random() - 0.5) * 2;
        
        nodePositions[nodeIndex * 3] = x;
        nodePositions[nodeIndex * 3 + 1] = y;
        nodePositions[nodeIndex * 3 + 2] = z;
        
        layerNodeIndices.push(nodeIndex);
        nodeIndex++;
      }
      layerNodes.push(layerNodeIndices);
    });
    
    // Create connections between adjacent layers
    for (let layer = 0; layer < layerNodes.length - 1; layer++) {
      const currentLayer = layerNodes[layer];
      const nextLayer = layerNodes[layer + 1];
      
      currentLayer.forEach(nodeA => {
        nextLayer.forEach(nodeB => {
          if (Math.random() > 0.3) { // 70% connection probability
            nodeConnections.push([nodeA, nodeB]);
          }
        });
      });
    }
    
    return { positions: nodePositions, connections: nodeConnections };
  }, []);

  // Animate nodes
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] = Math.sin(time * 2 + i) * 0.1; // Gentle Z oscillation
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Neural Network Nodes */}
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Neural Network Connections */}
      <group ref={lineRef}>
        {connections.map(([startIdx, endIdx], i) => {
          const start = new THREE.Vector3(
            positions[startIdx * 3],
            positions[startIdx * 3 + 1],
            positions[startIdx * 3 + 2]
          );
          const end = new THREE.Vector3(
            positions[endIdx * 3],
            positions[endIdx * 3 + 1],
            positions[endIdx * 3 + 2]
          );
          
          return (
            <Line
              key={i}
              points={[start, end]}
              color="#00ffff"
              opacity={0.3}
              transparent
              lineWidth={1}
            />
          );
        })}
      </group>
    </group>
  );
};

// Data Particles Component
const DataParticles = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 200;
  
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Start particles from left side
      positions[i * 3] = -8 + Math.random() * 2; // X: left side
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8; // Y: spread vertically
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4; // Z: depth variation
      
      // Set velocity towards right (brain)
      velocities[i * 3] = 0.5 + Math.random() * 1; // X velocity
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2; // Slight Y drift
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1; // Slight Z drift
    }
    
    return { positions, velocities };
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Move particles
        positions[i3] += velocities[i3] * delta; // Move right
        positions[i3 + 1] += velocities[i3 + 1] * delta; // Y drift
        positions[i3 + 2] += velocities[i3 + 2] * delta; // Z drift
        
        // Reset particles that reach the brain area
        if (positions[i3] > 6) {
          positions[i3] = -8 + Math.random() * 2;
          positions[i3 + 1] = (Math.random() - 0.5) * 8;
          positions[i3 + 2] = (Math.random() - 0.5) * 4;
        }
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff6b6b"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Brain Structure Component
const BrainStructure = () => {
  const brainRef = useRef<THREE.Group>(null);
  const particleRef = useRef<THREE.Points>(null);
  
  // Generate brain-like structure
  const { brainPositions, brainConnections } = useMemo(() => {
    const positions = new Float32Array(80 * 3); // 80 brain nodes
    const connections: Array<[number, number]> = [];
    
    // Create brain hemisphere structures
    for (let i = 0; i < 80; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = 1.5 + Math.random() * 0.5;
      
      // Position on right side as brain
      const x = 4 + radius * Math.sin(theta) * Math.cos(phi) * 0.8;
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta) * 0.6;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Create connections to nearby nodes
      for (let j = 0; j < i; j++) {
        const distance = Math.sqrt(
          Math.pow(positions[i * 3] - positions[j * 3], 2) +
          Math.pow(positions[i * 3 + 1] - positions[j * 3 + 1], 2) +
          Math.pow(positions[i * 3 + 2] - positions[j * 3 + 2], 2)
        );
        
        if (distance < 1.2 && Math.random() > 0.6) {
          connections.push([i, j]);
        }
      }
    }
    
    return { brainPositions: positions, brainConnections: connections };
  }, []);

  useFrame((state) => {
    if (brainRef.current) {
      const time = state.clock.getElapsedTime();
      brainRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
      brainRef.current.rotation.x = Math.sin(time * 0.2) * 0.05;
    }
    
    if (particleRef.current) {
      const time = state.clock.getElapsedTime();
      const positions = particleRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time * 3 + i) * 0.002; // Gentle floating
      }
      particleRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={brainRef}>
      {/* Brain Nodes */}
      <Points ref={particleRef} positions={brainPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#9d4edd"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Brain Connections */}
      {brainConnections.map(([startIdx, endIdx], i) => {
        const start = new THREE.Vector3(
          brainPositions[startIdx * 3],
          brainPositions[startIdx * 3 + 1],
          brainPositions[startIdx * 3 + 2]
        );
        const end = new THREE.Vector3(
          brainPositions[endIdx * 3],
          brainPositions[endIdx * 3 + 1],
          brainPositions[endIdx * 3 + 2]
        );
        
        return (
          <Line
            key={i}
            points={[start, end]}
            color="#9d4edd"
            opacity={0.4}
            transparent
            lineWidth={0.5}
          />
        );
      })}
    </group>
  );
};

// Main Scene Component
const Scene = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 8);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff6b6b" />
      <pointLight position={[5, 0, 5]} intensity={0.4} color="#9d4edd" />
      
      <NeuralNodes />
      <DataParticles />
      <BrainStructure />
    </>
  );
};

// Main Component
const NeuralNetworkBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default NeuralNetworkBackground;