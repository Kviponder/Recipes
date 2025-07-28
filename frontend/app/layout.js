import '../app/globals.css';

export const metadata = {
  title: 'My Recipe Collection',
  description: 'A personal recipe book built with Next.js and Tailwind CSS',
};

/**
 * The root layout for the application. This component wraps all pages and
 * applies global styles and metadata. It uses semantic HTML and ensures
 * that the page is responsive across devices.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-white shadow mb-6">
          <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-800">My Recipe Collection</h1>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} My Recipe Collection
        </footer>
      </body>
    </html>
  );
}