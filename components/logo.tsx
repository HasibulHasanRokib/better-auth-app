import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-2">
        <div className=" h-10 w-10 relative bg-primary rounded-full flex justify-center items-center">
          <Image src={"/vercel.svg"} alt="logo" width={16} height={16} />
        </div>
        <span className="text-xl font-semibold">BetterAuth</span>
      </div>
    </Link>
  );
}
