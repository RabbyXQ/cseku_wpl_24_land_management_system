import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBell, FaCartPlus, FaCircleNotch, FaCog, FaDollarSign, FaFacebookMessenger, FaHammer, FaHandsHelping, FaHome, FaMap, FaMapMarked, FaMapMarkedAlt, FaMapMarker, FaMapSigns, FaQuestion, FaRss, FaShopify, FaShoppingBasket, FaStore, FaUser, FaUserCheck, FaUserCog, FaUserFriends, FaWallet } from 'react-icons/fa';

const menuItems = [
  { href: '/dashboard', icon: <FaRss className="h-6 w-6" />, name: 'Lands' },
  { href: '/profile', 
    icon: <FaUser className="h-6 w-6" />, 
    name: 'Profile',
    subMenu: [
      { href: '/followers', name: 'Followers', icon: <FaUserFriends className="h-4 w-4" /> },
      { href: '/followings', name: 'Followers', icon: <FaUserFriends className="h-4 w-4" /> },
    ]
  },
  { href: '/participators', 
    icon: <FaHandsHelping className="h-6 w-6" />, 
    name: 'Participators',
    subMenu: [
      { href: '/participators/add', name: 'Add Participator', icon: <FaHandsHelping className="h-4 w-4" /> },
    ]
  },
  { 
    href: '/dashboard/land',
    icon: <FaMap className="h-6 w-6" />, 
    name: 'Lands',
    subMenu: [
      { href: '/dashboard/land/add', name: 'Add Land', icon: <FaMapMarked className="h-4 w-4" /> },
      { href: '/dashboard/land/calculate', name: 'Divide Land', icon: <FaMapSigns className="h-4 w-4" /> },
      { href: '/dashboard/land/add-to-market', name: 'Add to Market', icon: <FaMapMarkedAlt className="h-4 w-4" /> }
    ]
  },
  { 
    href: '/dashboard/market', 
    icon: <FaStore className="h-6 w-6" />, 
    name: 'Market' 
  },
  { href: '/bids', icon: <FaHammer className="h-6 w-6" />, name: 'Bids' },
  { href: '/messages', icon: <FaFacebookMessenger className="h-6 w-6" />, name: 'Messages' },
  { href: '/notifications', icon: <FaBell className="h-6 w-6" />, name: 'Notifications' },
  {
    href: '/settings',
    icon: <FaCog className="h-6 w-6" />,
    name: 'Settings',
    subMenu: [
      { href: '/settings/general', name: 'General', icon: <FaCog className="h-4 w-4" /> },
      { href: '/settings/privacy', name: 'Privacy', icon: <FaCog className="h-4 w-4" /> }
    ]
  },
  {
    href: '/help',
    icon: <FaQuestion className="h-6 w-6" />,
    name: 'Help',
    subMenu: [
      { href: '/help/faq', name: 'FAQ', icon: <FaQuestion className="h-4 w-4" /> },
      { href: '/help/contact', name: 'Contact', icon: <FaQuestion className="h-4 w-4" /> }
    ]
  },
];

const Sidebar = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <div className="fixed top-0 left-0 h-full w-16 bg-gray-800 text-white z-50 flex flex-col items-center">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`relative flex items-center group w-16 h-12 ${pathname === item.href ? 'bg-green-100 text-black' : ''}`}
        >
          {/* Background effect */}
          <div className={`absolute inset-0 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left z-0 ${pathname === item.href ? 'bg-green-500 dark:bg-green-700' : 'bg-gray-700'}`}></div>

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
                  <Link key={sub.href} href={sub.href} className="flex items-center px-4 py-2 hover:bg-green-500  dark:hover:bg-green-700 transition-colors duration-300">
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
