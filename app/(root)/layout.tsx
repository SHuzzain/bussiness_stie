import Image from "next/image";
import React, { ReactNode } from "react";
import HomepageBg from "@/images/AI_bg.webp";
type Props = {
  children: ReactNode;
};

const layout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <main className="h-full w-full relative">
        {children}
        <Image
          fill
          property=""
          src={HomepageBg}
          alt="home bg"
          className="absolute -z-10 object-cover"
        />
      </main>
    </>
  );
};

export default layout;
