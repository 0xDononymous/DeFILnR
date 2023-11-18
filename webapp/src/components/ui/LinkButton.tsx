import { classes } from "@/lib/utils";
import Link from "next/link";

export function LinkButton({ label, href, selected, disabled }:{
  label: string,
  href: string,
  selected?: boolean,
  disabled?: boolean,
}) {
  return (
    <Link href={href} prefetch={false}>
      <div 
        className="text-highlight text-md font-mono border-[1px] border-highlight bg-buttonbg px-4 py-2 hover:bg-buttonbg-hover hover:text-white duration-300 cursor-pointer"
      >
        { label }
      </div>
    </Link>
  )
}

export function LinkButtonQuery({ label, pathname, data, selected, disabled }:{
  label: string,
  pathname: string,
  data: any,
  selected?: boolean,
  disabled?: boolean,
}) {
  console.log("tttesttt", data.blockNumber);
  return (
    <Link 
      href={{
        pathname: pathname,
        query: data,
      }} 
      prefetch={false}
    >
      <div 
        className="text-highlight text-md font-mono border-[1px] border-highlight bg-buttonbg px-4 py-2 hover:bg-buttonbg-hover hover:text-white duration-300 cursor-pointer"
      >
        { label }
      </div>
    </Link>
  )
}