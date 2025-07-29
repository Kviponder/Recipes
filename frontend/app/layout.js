import "../app/globals.css";

export const metadata = {
  title: "🍝🍝🍝",
  description: "A personal recipe book built with Next.js and Tailwind CSS",
};

/**
 * The root layout for the application. This component wraps all pages and
 * applies global styles and metadata. It uses semantic HTML and ensures
 * that the page is responsive across devices.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function AnimatedSteam() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-steam"
    >
      <circle cx="50" cy="60" r="8" fill="#033cf8ff">
        <animate
          attributeName="cy"
          values="60;40;60"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="70" cy="70" r="5" fill="#033cf8ff">
        <animate
          attributeName="cy"
          values="70;45;70"
          dur="2.5s"
          begin="0.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="2.5s"
          begin="0.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-white shadow mb-6">
          <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center gap-3">
              <AnimatedSteam />
              <a
                href="/"
                className="text-2xl font-bold text-gray-800 hover:underline"
              >
                Dani and Kai's Epic Recipes
              </a>{" "}
            </div>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Dani and Kai's Epic recipes
        </footer>
      </body>
    </html>
  );
}
