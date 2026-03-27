import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Menu, Icon, Label } from 'semantic-ui-react'
import './AppLayout.css'

const navItems = [
  { to: '#', icon: 'comments', label: 'Interactions' },
  { to: '#', icon: 'help circle', label: 'FAQs' },
  { to: '#', icon: 'file text', label: 'Knowledge Articles' },
  { to: '#', icon: 'ticket', label: 'Tickets', hasPlus: true },
  { to: '#', icon: 'book', label: 'Reference Catalog' },
  { to: '#', icon: 'paint brush', label: 'Storefront Designer' },
  { to: '#', icon: 'box', label: 'Bundles' },
  { to: '#', icon: 'shield', label: 'Role Bundles' },
  { to: '#', icon: 'list', label: 'Onboarding' },
  { to: '#', icon: 'building', label: 'Service Department' },
  { to: '#', icon: 'users', label: 'Service Teams' },
  { to: '#', icon: 'user', label: 'Users', hasPlus: true },
  { divider: true },
  { to: '#', icon: 'plug', label: 'Integration Hub' },
  { to: '#', icon: 'lock', label: 'Authentication' },
  { to: '#', icon: 'chart bar', label: 'Reports' },
  { to: '#', icon: 'map marker alternate', label: 'Locations' },
  { to: '/global-settings', icon: 'setting', label: 'Global Settings' },
]

export default function AppLayout() {
  const location = useLocation()
  const pageTitle = location.pathname === '/global-settings' ? 'Global Settings' : 'Cluster Dashboard'

  return (
    <>
      {/* Top bar */}
      <Menu fixed="top" borderless className="topbar-menu">
        <Menu.Item header>
          <Icon name="coffee" />
          {pageTitle}
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Label circular color="green" size="large">EW</Label>
            <Icon name="dropdown" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      {/* Sidebar */}
      <div className="app-sidebar">
        <Menu vertical fluid borderless className="sidebar-nav">
          {navItems.map((item, i) => {
            if (item.divider) return <div key={i} className="nav-divider" />
            const isActive = item.to !== '#' && location.pathname === item.to
            return (
              <Menu.Item
                key={i}
                as={NavLink}
                to={item.to}
                active={isActive}
                className="sidebar-item"
              >
                <div className="sidebar-item-content">
                  <span><Icon name={item.icon} /> {item.label}</span>
                  {item.hasPlus && (
                    <Icon name="plus" className="plus-icon" size="small" onClick={e => e.preventDefault()} />
                  )}
                </div>
              </Menu.Item>
            )
          })}
        </Menu>
      </div>

      {/* Main content */}
      <div className="main-content">
        <Outlet />
      </div>
    </>
  )
}
