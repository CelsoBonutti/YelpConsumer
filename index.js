import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import App from "./App";
import { name as appName } from "./app.json";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import configureStore from "./src/store/configureStore";

const { store } = configureStore();
const persistor = persistStore(store);

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
