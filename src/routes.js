import App from 'components/App'
import Home from 'components/Home'
import Article from 'components/Article'
import Login from 'components/Login'
import Settings from 'components/Settings'
import MobileApps from 'components/MobileApps'
import NotFound from 'components/NotFound'

const routes = [
  { component: App,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      { path: '/login',
        component: Login
      },
      { path: '/article/:id',
        component: Article
      },
      { path: '/settings',
        component: Settings
      },
      { path: '/apps',
        component: MobileApps
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
]

export default routes
