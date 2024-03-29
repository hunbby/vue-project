<template>
  <div class="app-layout__navbar">
    <va-navbar>
      <template #left>
        <div class="left">
          <va-icon-menu-collapsed
            :class="{ 'x-flip': isSidebarMinimized }"
            class="va-navbar__item"
            :color="colors.primary"
            @click="isSidebarMinimized = !isSidebarMinimized"
          />
          <router-link :to="{ name: 'board' }">
            <vuestic-logo class="logo" />
          </router-link>
        </div>
      </template>
      <template #center>
        <span class="app-navbar__text">
          개인 프로젝트&nbsp;
          <a href="mailto:rn1349@naver.com" target="_blank" :style="{ color: colors.primary }">
            rn1349@naver.com
          </a>
          <va-button
            href="https://github.com/hunbby/vue-project"
            color="#000000"
            class="app-navbar__github-button"
            icon="github"
            target="_blank"
          >
            {{ $t('navbar.repository') }}
          </va-button>
        </span>
      </template>
      <template #right>
        <app-navbar-actions class="app-navbar__actions md5 lg4" :user-name="userName" />
      </template>
    </va-navbar>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useColors } from 'vuestic-ui'
import { useStore } from 'vuex'

import VaIconMenuCollapsed from '../icons/VaIconMenuCollapsed.vue'
import VuesticLogo from '../vuestic-logo.vue'
import AppNavbarActions from './components/AppNavbarActions.vue'

export default {
  components: { VuesticLogo, AppNavbarActions, VaIconMenuCollapsed },
  setup() {
    const { getColors } = useColors()
    const colors = computed(() => getColors())
    const store = useStore()

    const isSidebarMinimized = computed({
      get: () => store.state.isSidebarMinimized,
      set: (value) => store.commit('updateSidebarCollapsedState', value),
    })

    const userName = computed(() => store.state.userName)
    return {
      colors,
      isSidebarMinimized,
      userName,
    }
  },
}
</script>

<style lang="scss" scoped>
.va-navbar {
  box-shadow: var(--va-box-shadow);
  z-index: 2;
  &__center {
    @media screen and (max-width: 1200px) {
      .app-navbar__github-button {
        display: none;
      }
    }
    @media screen and (max-width: 950px) {
      .app-navbar__text {
        display: none;
      }
    }
  }

  @media screen and (max-width: 950px) {
    .left {
      width: 100%;
    }
    .app-navbar__actions {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}

.left {
  display: flex;
  align-items: center;
  & > * {
    margin-right: 1.5rem;
  }
  & > *:last-child {
    margin-right: 0;
  }
}

.x-flip {
  transform: scaleX(-100%);
}

.app-navbar__text > * {
  margin-right: 0.5rem;
  &:last-child {
    margin-right: 0;
  }
}
</style>
