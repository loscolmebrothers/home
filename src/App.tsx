import { useRef } from "react";
import { SparkleSystem } from "./components/SparkleSystem";
import type { SparkleSystemHandle } from "./components/SparkleSystem";
import { Landing } from "./components/Landing";

function App() {
  const sparkleSystemRef = useRef<SparkleSystemHandle>(null);

  return (
    <>
      <SparkleSystem ref={sparkleSystemRef} />
      <Landing />
    </>
  );
}

export default App;
