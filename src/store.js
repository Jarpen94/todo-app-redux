import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
 import thunk from 'redux-thunk'
 // import reducers here

 import auth from './state/auth'
 import todo from './state/todo'
 const reducer = combineReducers({
   auth,
   todo
   // reducers here
 })
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
 export const store = createStore(
   reducer,
   composeEnhancers(
     applyMiddleware(thunk)
   )
 ) 
