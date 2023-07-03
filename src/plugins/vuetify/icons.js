import { Icon } from '@iconify/vue'
import { aliases } from 'vuetify/lib/iconsets/mdi'

const alertTypeIcon = {
  success: 'mdi-check-circle',
  info: 'mdi-information',
  warning: 'mdi-alert',
  error: 'mdi-alert-circle',
}

const modifiedAliases = Object.assign(aliases, alertTypeIcon)
export const iconify = {
  component: props => h(Icon, props),
}
export const icons = {
  defaultSet: 'iconify',
  mergedAliases: modifiedAliases,
  sets: {
    iconify,
  },
}
