import { Context } from '@nuxt/types'

export function makeAsyncData (url: string, axiosConfig: any, data: any) {
  async function asyncData (ctx: Context) {
    const { page, limit } = ctx.route.query
    const partners = await ctx.app.$axios.get(url, {
      ...axiosConfig,
      params: ctx.route.query
    })
    return {
      q: ctx.route.query.q || '',
      data: partners.data.payload,
      options: {
        page: Number(page || 1),
        itemsPerPage: Number(limit || 10)
      },
      ...data
    }
  }
  return asyncData
}
