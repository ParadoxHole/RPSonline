
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/register', component: () => import('pages/RegisterPage.vue') },
      { path: '/user', component: () => import('pages/ListUserPage.vue') },
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: '/play', component: () => import('pages/GamePlayPage.vue') },
      { path: '/Leaderboard', component: () => import('pages/leaderBoardPage.vue') },
      //profil
      { path: '/profile', component: () => import('pages/ProfilePage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
