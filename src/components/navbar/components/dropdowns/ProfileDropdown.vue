<template>
  <va-dropdown
    v-model="isShown"
    class="profile-dropdown"
    boundary-body
    position="bottom"
    :offset="[0, 13]"
  >
    <template #anchor>
      <span class="profile-dropdown__anchor">
        <slot />
        <va-icon class="px-2" :name="isShown ? 'angle_up' : 'angle_down'" :color="theme.primary" />
      </span>
    </template>
    <va-dropdown-content class="profile-dropdown__content">
      <va-list-item v-for="option in options" :key="option.name">
        <router-link :to="{ name: option.redirectTo }" class="profile-dropdown__item">
          {{ $t(`user.${option.name}`) }}
        </router-link>
      </va-list-item>
      <va-list-item>
        <router-link :to="{ name: 'login' }" class="profile-dropdown__item" @click="logout">
          LogOut
        </router-link>
      </va-list-item>
    </va-dropdown-content>
  </va-dropdown>
</template>

<script>
import { useGlobalConfig } from 'vuestic-ui'

export default {
  name: 'ProfileSection',
  props: {
    options: {
      type: Array,
      default: () => [
        {
          name: 'profile',
          redirectTo: '',
        },
      ],
    },
  },
  data() {
    return {
      isShown: false,
    }
  },
  computed: {
    theme() {
      return useGlobalConfig().getGlobalConfig()
    },
  },
  methods: {
    logout() {
      console.log('로그아웃 실행')
      this.$store.dispatch('authModule/logout')
    },
  },
}
</script>

<style lang="scss">
.profile-dropdown {
  cursor: pointer;

  .va-dropdown-popper__anchor {
    display: flex;
    justify-content: flex-end;
  }

  &__content {
    width: 8rem;
  }

  &__item {
    display: block;
    color: var(--va-gray);

    &:hover,
    &:active {
      color: var(--va-primary);
    }
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}
</style>
