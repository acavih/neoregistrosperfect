import { ActionTree } from 'vuex'
import { format } from 'date-fns'

function calcularEdad (fecha: string) {
  const hoy = new Date()
  const cumpleanos = new Date(fecha)
  let edad = hoy.getFullYear() - cumpleanos.getFullYear()
  const m = hoy.getMonth() - cumpleanos.getMonth()

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edad--
  }

  return edad
}

export const state = () => ({
  items: [],
  headers: [
    { text: 'Codigo', value: 'code' },
    { text: 'Nombre', value: 'name' },
    { text: 'Apellidos', value: 'surname' },
    { text: 'Acciones', value: 'actions' }
  ],
  item: {} as any
})

type PartnerState = ReturnType<typeof state>

export const mutations = {
  setItems (state: PartnerState, items: never[]) {
    state.items = items
  },
  setItem (state: PartnerState, item: never) {
    state.item = item
  }
}

export const getters = {
  formattedDate (state: PartnerState) {
    if (state.item.bornDate) {
      return format(new Date(state.item.bornDate), 'dd/MM/yyyy')
    } else {
      return null
    }
  },
  edad (state: PartnerState, getters: any) {
    if (getters.formattedDate) {
      return calcularEdad(state.item.bornDate)
    } else {
      return null
    }
  }
}

export const actions: ActionTree<PartnerState, any> = {
  fetchPartners (context, query) {
    console.log('query', query)
    return this.$axios.$get('/api/partners', { params: query }).then((response) => {
      context.commit('setItems', response.payload)
    })
  },
  async createPartner (_context, partner) {
    await this.$axios.$post('/api/partners', partner)
  },
  async fetchPartner (_context, id) {
    const partnerPopulateFields = [
      'sex',
      'partner',
      'nationality',
      'residency'
    ]
    const response = await this.$axios.$get(`/api/partners/${id}`, {
      params: { populate: partnerPopulateFields.join(' ') }
    })
    _context.commit('setItem', response.payload)
  }
}
