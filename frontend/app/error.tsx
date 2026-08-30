'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-red-500 mb-4 text-xl font-bold">Terjadi Kesalahan!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Coba Lagi
      </button>
    </div>
  );
}