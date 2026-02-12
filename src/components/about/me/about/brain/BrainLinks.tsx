import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  rotates: Record<string, any>;
}

export default function BrainLinks({ rotates }: Props) {
  return (
    <>
      <Link href="https://lama.dev">
        <motion.path
          d="M27.483 20.034a1.348 1.348..."
          fill="#FFF"
          stroke="#000"
          style={{ rotate: rotates.f4 }}
        />
      </Link>
    </>
  );
}
