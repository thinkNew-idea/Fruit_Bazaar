import { createStore } from 'redux';
import rootReducer from '../reducers';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
const persistConfig = {
    key: 'root',
    storage,
  }
 
const persistedReducer = persistReducer(persistConfig, rootReducer)  
// const store = createStore(rootReducer);


 const store = createStore(persistedReducer)
 const Persistor = persistStore(store)

// export default Persistor;
export default store;
    // const persistor = persistStore(store)
 