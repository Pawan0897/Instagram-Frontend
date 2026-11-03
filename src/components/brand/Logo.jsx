import { Link } from "react-router-dom";
import pic from "../../img/image.png";
export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 no-underline">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-lg font-extrabold text-white shadow-md">
        V
      </span>
      <span>
        <span className="block text-[17px] font-extrabold leading-none text-[var(--text)]">

          <img src={pic} alt="" width={100} height={100} />
        </span>
        <span className="mt-1 block text-[10px] font-medium tracking-wide text-[var(--muted)]">Connect · Create · Explore</span>
      </span>
    </Link>
  );
}
