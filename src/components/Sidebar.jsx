import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  let location = null;
  try {
    location = useLocation();
  } catch (e) {
    // Ignore context error if rendered outside Router in tests
  }
  const currentPath = location?.pathname || '/';

  const mainNavItems = [
    { name: 'Bid', path: '/' },
    { name: 'POD', path: '/pod' },
    { name: 'Vendor', path: '/vendor' },
    { name: 'User', path: '/user' }
  ];

  const footerNavItems = [
    { name: 'Settings', path: '/settings' },
    { name: 'Profile', path: '/profile' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Logout', path: '/logout' }
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <img
            src="https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/placement-happenings/webcoding-gif/logo-bids-logistic.avif"
            alt="logo-image"
          />
          <span>LOGISTIC</span>
        </div>

        <nav className="sidebar-menu">
          <span className="sidebar-section-title">Main Menu</span>
          {mainNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`sidebar-link ${currentPath === item.path ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        {footerNavItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`sidebar-link ${currentPath === item.path ? 'active' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}

export { Sidebar };
export default Sidebar;
