import {
  OrbitControls as DreiOrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";
import {
  Dispatch,
  MutableRefObject,
  Ref,
  SetStateAction,
  Suspense,
} from "react";
import * as THREE from "three";
import IPhone from "./IPhone";
import Lights from "./Lights";
import Loader from "./Loader";
import { Model } from "./Model";
import { OrbitControls } from "three/examples/jsm/Addons.js";

interface ModelViewProps {
  index: number;
  groupRef: MutableRefObject<THREE.Group | null>;
  gsapType: string;
  controlRef: MutableRefObject<OrbitControls | null>;
  setRotationState: Dispatch<SetStateAction<number>>;
  size: string;
  item: Model;
}

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}: ModelViewProps) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${
        index === 2 ? "right-[-100%]" : ""
      } `}
    >
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <DreiOrbitControls
        makeDefault
        ref={controlRef as unknown as Ref<typeof DreiOrbitControls>}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() =>
          controlRef.current
            ? setRotationState(controlRef.current.getAzimuthalAngle())
            : null
        }
      />
      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large'`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
