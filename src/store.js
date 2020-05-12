// import { createStore } from "redux";
// import tokenReducer from "./reducers/tokenReducer";

// const initialState = "";

// export default createStore(tokenReducer, initialState);

import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import SetTransform from "./transforms";
import tokenReducer from "./reducers/tokenReducer";
import immutableTransform from "redux-persist-transform-immutable";
import createCompressor from "redux-persist-transform-compress";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const configureStore = () => {
  const persistConfig = {
    key: "root",
    storage: storage,
  };

  const initialState = "";

  const persistedReducer = persistReducer(persistConfig, tokenReducer);

  const store = createStore(
    persistedReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
