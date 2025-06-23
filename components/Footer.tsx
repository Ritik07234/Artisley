export default function Footer() {
  return (
    <footer className="w-full text-center text-sm text-gray-600 dark:!text-yellow-200 py-6 px-4 border-t border-gray-200 dark:!border-yellow-800 bg-white dark:!bg-gray-950 mt-12 flex-shrink-0">
      &copy; {new Date().getFullYear()} Artistly.com. All rights reserved.
    </footer>
  );
}
