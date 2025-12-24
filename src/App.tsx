import { useRef } from "react";
import { Island } from "./components/Island";
import { SparkleSystem } from "./components/SparkleSystem";
import type { SparkleSystemHandle } from "./components/SparkleSystem";
import { FloatingIllustrations } from "./components/FloatingIllustrations";
import type { FloatingIllustrationsHandle } from "./components/FloatingIllustrations";
import { CTATab } from "./components/CTATab";

function App() {
  const sparkleSystemRef = useRef<SparkleSystemHandle>(null);
  const floatingIllustrationsRef = useRef<FloatingIllustrationsHandle>(null);

  return (
    <>
      <FloatingIllustrations ref={floatingIllustrationsRef} />
      <SparkleSystem ref={sparkleSystemRef} />
      <Island
        sparkleSystemRef={sparkleSystemRef}
        floatingIllustrationsRef={floatingIllustrationsRef}
      />
      <CTATab />
    </>
  );
}

export default App;
