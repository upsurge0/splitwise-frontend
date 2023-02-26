import { combineReducers, configureStore } from '@reduxjs/toolkit'
import user from './user'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({
  user,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
