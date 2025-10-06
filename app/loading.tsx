'use client';


export default function Loading() {
  return (
    <div className="bg-white dark:bg-[#0f172a] flex justify-center items-start h-screen pt-28 w-full">
      <div className="flex flex-col justify-center items-center">
        <h2 className="dark:text-white loading text-center pt-5">Loading...</h2>
        <h2 className="dark:text-white loading text-center pt-5">Please wait...</h2>
        <div className="load pt-5 flex justify-center items-center">
          <div className="load-one rounded-full"></div>
          <div className="load-two rounded-full"></div>
          <div className="load-three rounded-full"></div>
        </div>
      </div>
    </div>
  );
}