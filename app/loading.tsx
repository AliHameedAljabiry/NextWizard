'use client';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="relative w-24 h-24 perspective-[600px]">
        <div className="absolute inset-0 animate-spin3d">
          {/* Cube faces */}
          <div className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 dark:from-green-400 dark:to-blue-700 rounded-lg shadow-lg"
            style={{ transform: 'rotateY(0deg) translateZ(48px)' }} />
          <div className="absolute w-full h-full bg-gradient-to-br from-pink-400 to-yellow-400 dark:from-purple-600 dark:to-pink-700 rounded-lg shadow-lg"
            style={{ transform: 'rotateY(90deg) translateZ(48px)' }} />
          <div className="absolute w-full h-full bg-gradient-to-br from-green-400 to-blue-400 dark:from-yellow-500 dark:to-green-700 rounded-lg shadow-lg"
            style={{ transform: 'rotateY(180deg) translateZ(48px)' }} />
          <div className="absolute w-full h-full bg-gradient-to-br from-yellow-400 to-red-400 dark:from-blue-500 dark:to-red-700 rounded-lg shadow-lg"
            style={{ transform: 'rotateY(-90deg) translateZ(48px)' }} />
          <div className="absolute w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900 rounded-lg shadow-lg"
            style={{ transform: 'rotateX(90deg) translateZ(48px)' }} />
          <div className="absolute w-full h-full bg-gradient-to-br from-indigo-400 to-blue-400 dark:from-indigo-700 dark:to-blue-900 rounded-lg shadow-lg"
            style={{ transform: 'rotateX(-90deg) translateZ(48px)' }} />
        </div>
      </div>
      <style jsx>{`
        .animate-spin3d {
          animation: spin3d 1.5s linear infinite;
          transform-style: preserve-3d;
        }
        @keyframes spin3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        .perspective-[600px] {
          perspective: 600px;
        }
      `}</style>
    </div>
  );
}