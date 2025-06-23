export default function Footer() {
  return (
    <footer className="w-full text-center text-sm text-gray-500 dark:text-gray-400 py-6 px-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 mt-12 flex-shrink-0">
      &copy; {new Date().getFullYear()} Artistly.com. All rights reserved.
    </footer>
  );
}
