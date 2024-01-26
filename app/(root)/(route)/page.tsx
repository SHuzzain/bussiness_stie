import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className={`h-full w-full  flex items-center text-white font-semibold px-5 `}
    >
      <div className="space-y-11">
        <h1 className="sm:text-7xl text-3xl leading-tight">
          Real Solutions,
          <br />
          <span className="text-[#ff0099]">Artificial Intelligence</span>
        </h1>
        <div>
          <Link href={"/userInfo"}>
            <Button
              size={"lg"}
              className="bg-transparent border text-white sm:px-12  hover:bg-[#ff0099] hover:border-transparent hover:text-white transition-all"
              variant={"ghost"}
            >
              Get Start
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
