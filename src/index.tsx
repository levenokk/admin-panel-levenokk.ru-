import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import store from './redux/store'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://admin.levenokk.ru/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache:new InMemoryCache({
    typePolicies: {
      Query: {
          fields: {
            images: {
              merge(existing, incoming) {
                return incoming;
              }
            },
            products: {
              merge(existing, incoming) {
                return incoming;
              },
            },
            mail: {
              merge(existing, incoming) {
                return incoming;
              },
            }
          }
      }
    }
  })
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
