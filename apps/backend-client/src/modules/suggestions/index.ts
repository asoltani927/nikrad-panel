import { FastifyInstance } from 'fastify'
import { getSuggestionsRoute } from './routes/get-suggestions.route'
import { getSuggestionRoute } from './routes/get-suggestion.route'
import { postSuggestionRoute } from './routes/post-suggestion.route'
import { deleteSuggestionRoute } from './routes/delete-suggestion.route'

export async function suggestionsModule(app: FastifyInstance) {
  app.register(
    async (suggestionsApp) => {
      suggestionsApp.register(getSuggestionsRoute)
      suggestionsApp.register(getSuggestionRoute)
      suggestionsApp.register(postSuggestionRoute)
      suggestionsApp.register(deleteSuggestionRoute)
    },
    { prefix: '/suggestions' },
  )
}
