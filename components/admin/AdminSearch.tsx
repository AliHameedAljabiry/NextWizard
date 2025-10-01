import useSWR from "swr";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AdminSearchBox() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSWR(
    query.length > 1 ? `/api/admin/adminSearch?q=${query}` : null,
    fetcher
  );

  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        placeholder="Search users, docs, projects..."
        className="flex-1 w-full bg-inherit border-none outline-none focus:ring-0 text-[#acc1da] placeholder-[#647488]"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true); // reopen when typing
        }}
      />

      {/* Results dropdown */}
      {isOpen && data && (
        <div className="absolute top-full left-0 mt-2 w-full max-h-60 overflow-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-md z-50">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.categories.map((c: any) => (
              <li key={c.id}>
                <Link
                  href={`/admin/docs?category=${c.id}`} 
                  className="block px-0.5 xs:px-4 py-2 text-xs md:text-[16px] hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white"
                  onClick={() => setIsOpen(false)} // close after click
                >
                  📂 {c.name}
                </Link>
              </li>
            ))}
            {data.parts.map((p: any) => (
              <li key={p.id}>
                <Link
                  href={`/admin/docs?category=${p.partCategory}`}
                  className="block px-0.5 xs:px-4 py-2 text-xs md:text-[16px] hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  🧩 {p.name}
                </Link>
              </li>
            ))}
            {data.steps.map((s: any) => (
              <li key={s.id}>
                <Link
                  href={`/admin/docs/stepDetails/${s.id}`}
                  className="block px-0.5 xs:px-4 py-2 text-xs md:text-[16px] hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  ➡️ {s.title}
                </Link>
              </li>
            ))}
            {data.projects.map((p: any) => (
              <li key={p.id}>
                <Link
                  href={`/projects/${p.id}`}
                  className="block px-0.5 xs:px-4 py-2 text-xs md:text-[16px] hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  📘 {p.title}
                </Link>
              </li>
            ))}
            {data.users.map((u: any) => (
              <li key={u.id}>
                <Link
                  href={`/admin/users`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  📘 {u.fullName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
