<template>
  <div class="icon-set">
    <va-card class="icon-set__header mb-4 py-3 ma-0">
      <va-card-title>
        <h2 class="my-0 ml-2" :style="{ color: theme.dark }">
          {{ iconSet.name }}
        </h2>
      </va-card-title>
      <va-card-content class="row">
        <div class="flex md3 xs12">
          <va-button outline :to="{ name: 'icon-sets' }">
            {{ $t('icons.back') }}
          </va-button>
        </div>

        <div class="flex md5 xs12 flex-center">
          <va-input
            v-model="search"
            :label="$t('icons.search')"
            class="mb-0"
            style="max-width: 300px"
            removable
          >
            <template v-slot:prependInner>
              <va-icon class="icon-left input-icon" name="search" />
            </template>
          </va-input>
        </div>

        <div class="flex md4 xs12 ma-0 flex-center content icon-set__header__size">
          <span
            class="ma-2 pr-2 shrink icon-set__header__size--smaller"
            :style="{ color: theme.dark }"
          >
            A
          </span>
          <va-slider
            value-visible
            v-model="iconSize"
            style="max-width: 300px"
            :label-value="`${iconSize}px`"
            :min="slider.min"
            :max="slider.max"
          ></va-slider>
          <span
            class="ma-2 pl-2 shrink icon-set__header__size--bigger"
            :style="{ color: theme.dark }"
          >
            A
          </span>
        </div>
      </va-card-content>
    </va-card>

    <va-card v-for="(list, index) in filteredLists" :key="index" class="flex md12">
      <va-card-title>
        {{ list.name }}
      </va-card-title>
      <va-card-content class="row">
        <span v-if="list.icons.length === 0">
          {{ $t('icons.none') }}
        </span>
        <div
          class="flex flex-center xs3 md1 mb-2 icon-grid-container"
          style="flex-direction: column"
          v-for="icon in list.icons"
          :key="icon"
        >
          <div class="vuestic-icon mb-3 pt-3">
            <va-icon :class="iconClass(icon)" :size="iconSize">{{ iconData(icon) }}</va-icon>
          </div>
          <div class="icon-text">
            {{ icon }}
          </div>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import { useGlobalConfig } from 'vuestic-ui'

export default {
  name: 'IconSet',
  props: {
    name: {
      type: String,
    },

    sets: {
      type: Array,
    },
  },
  data() {
    return {
      search: '',
      iconSize: 30,
      slider: {
        formatter: (v) => `${v}px`,
        min: 20,
        max: 40,
      },
    }
  },
  computed: {
    theme() {
      return useGlobalConfig().getGlobalConfig().colors
    },
    iconSet() {
      for (const set of this.sets) {
        if (set.href === this.name) {
          return set
        }
      }

      return {}
    },
    filteredLists() {
      if (!this.search) {
        // If nothing is searched - we return all sets
        return this.iconSet.lists
      }

      const foundIcons = []
      this.iconSet.lists.forEach((list) => {
        list.icons.forEach((icon) => {
          if (!icon.toUpperCase().includes(this.search.toUpperCase())) {
            return
          }
          // Same icon could be included in different sets.
          if (foundIcons.includes(icon)) {
            return
          }
          foundIcons.push(icon)
        })
      })

      // We return all found icons as a single set.
      return [
        {
          name: 'Found Icons',
          icons: foundIcons,
        },
      ]
    },
  },
  methods: {
    iconClass(icon) {
      return this.iconSet.prefix === 'material-icons'
        ? this.iconSet.prefix
        : `${this.iconSet.prefix} ${this.iconSet.prefix}-${icon}`
    },
    iconData(icon) {
      return this.iconSet.prefix === 'material-icons' ? icon : ''
    },
  },
}
</script>

<style lang="scss">
.icon-set {
  .icon-grid-container {
    &:hover {
      // color: $white;
      // background-color: $brand-primary;
      cursor: pointer;
    }

    .icon-text {
      font-size: 0.6rem;
    }
  }

  &__header {
    &__size {
      &--smaller,
      &--bigger {
        font-weight: 600;
      }

      &--smaller {
        line-height: 1em;
        font-size: 1em;
      }

      &--bigger {
        line-height: 1.3em;
        font-size: 1.3em;
      }
    }
  }
}
</style>
