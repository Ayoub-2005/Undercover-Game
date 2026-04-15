import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LobbyView from '../views/LobbyView.vue'
import SettingsView from '../views/SettingsView.vue'
import RevealView from '../views/RevealView.vue'
import GameStepView from '../views/GameStepView.vue'
import DashboardView from "../views/DashboardView.vue"


const routes = [
{ path: '/', component: HomeView },
{ path: '/settings', component: SettingsView },
{ path: '/lobby', component: LobbyView },
{ path: '/reveal', component: RevealView },
{ path: '/step', component: GameStepView },
{path: "/dashboard",component: DashboardView}
]

const router = createRouter({
history: createWebHistory(),
routes
})

export default router