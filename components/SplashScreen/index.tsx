'use client'
import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import Image from "next/image";
import img from "logo-l.png";

export default function SplashScreen({ finishLoading }) {
  const [isMounted, setIsMounted] = useState(false);

  const springProps = useSpring({
    from: { scale: 1 },
    to: { scale: 2 },
    config: { duration: 500 },
    onRest: () => finishLoading()
  });

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <animated.div id="logo" style={springProps}>
        <Image src={img} alt="" height={60} width={60} />
      </animated.div>
    </div>
  );
}
