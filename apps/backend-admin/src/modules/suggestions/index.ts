import { FastifyInstance } from 'fastify'
import { getSuggestionsRoute } from './routes/get-suggestions.route'
import { patchSuggestionRoute } from './routes/patch-suggestion.route'
import { getSuggestionRoute } from './routes/get-suggestion.route'

export async function suggestionsModule(app: FastifyInstance) {
  app.register(
    async (suggestionsApp) => {
      suggestionsApp.register(getSuggestionsRoute)
      suggestionsApp.register(patchSuggestionRoute)
      suggestionsApp.register(getSuggestionRoute)
    },
    { prefix: '/suggestions' },
  )
}
