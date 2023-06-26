import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      메인페이지
      <Link href="/board">게시판</Link>
    </main>
  );
}
