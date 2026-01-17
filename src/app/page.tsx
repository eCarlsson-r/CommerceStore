import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full h-[65vh] [max-width: 990px]:h-[60vh] bg-center bg-no-repeat bg-cover pt-[130px] [max-width: 990px]: bg-[100%_100%]">
        <div className="bg-white w-2/5 relative animate-[hairanimation_1s_ease-in-out] p-10 rounded-lg [max-990px]:w-[350px] [max-990px]:ml-[70px] [max-990px]:p-[50px] [max-990px]:rounded-lg">
          <h1 className="text-6xl text-blue-950">Hair</h1>
          <p className="text-xl leading-9">Start from the top. We got you covered with a range of formulas to keep your hair in tip-top shape and your style in mint condition.</p>
          <Link href="/catalog" className="bg-yellow-950 text-white text-xl cursor-pointer mt-5 p-5 rounded-4xl">Shop Shampoo</Link>
        </div>
      </div>
    </div>
  );
}
