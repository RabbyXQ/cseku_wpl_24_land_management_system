import Link from 'next/link';
import { HomeIcon, UserIcon, Cog6ToothIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const menuItems = [
  { href: '/', icon: <HomeIcon className="h-6 w-6 text-gray-400" />, name: 'Home' },
  { href: '/profile', icon: <UserIcon className="h-6 w-6 text-gray-400" />, name: 'Profile' },
  {
    href: '/settings',
    icon: <Cog6ToothIcon className="h-6 w-6 text-gray-400" />,
    name: 'Settings',
    subMenu: [
      { href: '/settings/general', name: 'General', icon: <Cog6ToothIcon className="h-4 w-4 text-gray-400" /> },
      { href: '/settings/privacy', name: 'Privacy', icon: <Cog6ToothIcon className="h-4 w-4 text-gray-400" /> }
    ]
  },
  {
    href: '/help',
    icon: <QuestionMarkCircleIcon className="h-6 w-6 text-gray-400" />,
    name: 'Help',
    subMenu: [
      { href: '/help/faq', name: 'FAQ', icon: <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400" /> },
      { href: '/help/contact', name: 'Contact', icon: <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400" /> }
    ]
  },
];

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-16 bg-gray-800 text-white z-50 flex flex-col items-center">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="relative flex items-center group w-16 h-12"
        >
          {/* Background effect */}
          <div className="absolute inset-0 bg-blue-600 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left z-0"></div>

          {/* Main icon link */}
          <div className="relative flex items-center justify-center w-16 h-16 z-10">
            <Link href={item.href} className="flex items-center justify-center w-full h-full">
              {item.icon}
            </Link>
          </div>

          {/* Submenu */}
          {item.subMenu && (
            <div className="absolute left-full top-0 mt-2 bg-gray-700 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-48 z-30 pointer-events-none group-hover:pointer-events-auto">
              <div className="px-4 py-2 border-b border-gray-600 text-sm font-semibold">
                {item.name}
              </div>
              <div className="max-h-60 overflow-y-auto">
                {item.subMenu.map(sub => (
                  <Link key={sub.href} href={sub.href} className="flex items-center px-4 py-2 hover:bg-blue-600 transition-colors duration-300">
                    {sub.icon}
                    <span className="ml-2">{sub.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
