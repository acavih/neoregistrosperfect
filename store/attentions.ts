import { ActionTree } from 'vuex'
import { format } from 'date-fns'

export const state = () => ({
  items: []
})

type AttentionState = ReturnType<typeof state>

export const mutations = {
  setItems (state: AttentionState, items: never[]) {
    state.items = items
  }
}

export const getters = {
  attentionsGrouped (state: AttentionState) {
    return (state.items as any[]).reduce((acc, value) => {
      const formattedDateAttention = format(new Date(value.dateAttention), 'P')
      const existing = acc.filter((a: any) => a.date === formattedDateAttention)[0]
      console.log(existing)
      // acc.push({ date: value.dateAttention, items: [value] })
      if (existing) {
        existing.items.push(value)
      } else {
        acc.push({ date: value.dateAttention, items: [value] })
      }
      return acc
    }, [])
  }
}

export const actions: ActionTree<AttentionState, any> = {
  fetchAttentions (context, partner) {
    const attentionsPopulateFields = [
      'attentionReasons',
      'attentionsTypes',
      'projects',
      'derivedTo',
      'derivedFrom',
      'formation',
      'volunteer',
      'placeAttention'
    ]
    return this.$axios.$get('/api/attentions', {
      params: { user: partner, populate: attentionsPopulateFields.join(' ') }
    }).then((response) => {
      context.commit('setItems', response.payload)
    })
  }
}
