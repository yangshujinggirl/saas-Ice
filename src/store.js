import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import ApiMiddleware from './base/middlewares/ApiMiddleware'
import AllReducers from './_reducers'

const store = createStore(
	combineReducers(AllReducers),
	applyMiddleware(
		thunkMiddleware,
		createLogger(),
		ApiMiddleware
	)
);

export default store;