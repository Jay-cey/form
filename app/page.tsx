import Link from "next/link";

export default function Home() {
  return (
    <main className="grid justify-center h-dvh content-center">
      <p className="font-bold text-3xl mt-28">Welcome to Carribian!</p>
      <div className="flex space-x-14 *:underline text-cyan-900 text-xl">
        <Link href="/products">View Products</Link>
        <Link href="/products/new">Add New Product</Link>
      </div>
    </main>
  );
}
