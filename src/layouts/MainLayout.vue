<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="brand">
        <span class="logo">A1</span>
        <div>
          <p class="title">Logistics</p>
          <small>Management</small>
        </div>
      </div>
      <nav>
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="{ active: route.path.startsWith(link.to) }"
        >
          <span>{{ link.label }}</span>
          <span v-if="link.badge" class="badge">{{ link.badge }}</span>
        </router-link>
      </nav>
      <div class="sidebar-footer">
        <p class="text-xs">Fleet uptime</p>
        <p class="stat">98.2%</p>
        <p class="muted">+2.1% vs last week</p>
      </div>
    </aside>
    <div class="content">
      <header class="topbar">
        <div>
          <h1>{{ pageTitle }}</h1>
          <p class="muted">Coordinating A1 Logistics nationwide network</p>
        </div>
        <div class="topbar-actions">
          <div class="search-wrapper">
            <input v-model="globalSearch" type="search" placeholder="Search drivers, loads, trucks..." />
          </div>
          <button class="icon-button" aria-label="Notifications">
            🔔
          </button>
          <div class="user-menu" @click="toggleMenu">
            <img :src="auth.user?.avatarUrl ?? defaultAvatar" alt="avatar" />
            <div>
              <p class="user-name">{{ auth.user?.name ?? 'Fleet Manager' }}</p>
              <small>{{ auth.user?.role ?? 'Admin' }}</small>
            </div>
            <div v-if="menuOpen" class="dropdown">
              <button @click.stop="goToAccount">Profile & Account</button>
              <button @click.stop="logout">Logout</button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const defaultAvatar = 'https://api.dicebear.com/7.x/initials/svg?seed=A1&backgroundColor=b3d4fc';
const menuOpen = ref(false);
const globalSearch = ref('');

const navLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Dispatch', to: '/dispatch' },
  { label: 'Drivers', to: '/drivers' },
  { label: 'Fleet', to: '/fleet' },
  { label: 'Finance', to: '/finance' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Notifications', to: '/notifications', badge: '5' },
  { label: 'Mobile App', to: '/mobile-app' },
  { label: 'Settings', to: '/settings' }
];

const pageTitle = computed(() => (route.meta?.title as string) ?? 'A1 Logistics');

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function logout() {
  auth.logout();
  router.push({ name: 'login' });
}

function goToAccount() {
  router.push({ name: 'account' });
  menuOpen.value = false;
}
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: var(--sidebar-width);
  background: linear-gradient(180deg, #1e3a8a, #1d4ed8);
  color: #fff;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 1.25rem;
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  transition: background 0.2s ease;
}

.nav-link.active,
.nav-link:hover {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

.badge {
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  padding: 0.1rem 0.6rem;
}

.sidebar-footer {
  margin-top: auto;
  background: rgba(15, 23, 42, 0.25);
  border-radius: 12px;
  padding: 1rem;
}

.sidebar-footer .stat {
  font-size: 1.6rem;
  font-weight: 600;
}

.sidebar-footer .muted {
  font-size: 0.85rem;
  opacity: 0.7;
}

.content {
  flex: 1;
  background: #f6f8fb;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.topbar h1 {
  font-size: 1.75rem;
}

.topbar .muted {
  color: #64748b;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-wrapper {
  min-width: 280px;
}

.icon-button {
  border: none;
  background: #e2e8f0;
  border-radius: 999px;
  width: 40px;
  height: 40px;
  font-size: 1.1rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fff;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  cursor: pointer;
  position: relative;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
}

.user-menu img {
  width: 40px;
  height: 40px;
  border-radius: 999px;
}

.user-name {
  font-weight: 600;
}

.dropdown {
  position: absolute;
  top: 60px;
  right: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.15);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  min-width: 180px;
}

.dropdown button {
  border: none;
  background: none;
  text-align: left;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
}

.dropdown button:hover {
  background: #f1f5f9;
}

main {
  flex: 1;
}

@media (max-width: 960px) {
  .layout {
    flex-direction: column;
  }
  .sidebar {
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
  }
  .content {
    padding: 1rem;
  }
  .search-wrapper {
    min-width: 160px;
  }
}
</style>
