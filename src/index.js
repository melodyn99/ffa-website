import 'react-app-polyfill/ie9';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import {
    createStore, combineReducers, applyMiddleware,
    compose
} from 'redux'
import { Provider } from 'react-redux'

// react-router-redux https://github.com/sysgears/react-router-redux
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import {
    ConnectedRouter, routerReducer, routerMiddleware,
    // push
} from 'react-router-redux'

// redux-persist https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/lib/integration/react';

// i18n-js
import {
    // useTranslation,
    I18nextProvider
    // , withTranslation
    // , Trans
} from 'react-i18next';
//import './i18n/i18n';
import i18n from './i18n/i18n';

// @material-ui
import { theme } from './utils/01MaterialJsStyles/theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

// socket.io
import socketIoMiddleware from 'redux-socket.io-middleware';
import io from './socket/connect';

// IMPORT REDUCERS
import authReducer from './Redux/Reducer/authReducer';

// APP ENTRY POINT
import App from './App';

import * as serviceWorker from './serviceWorker';

// react-router-redux
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const appReducer = combineReducers({
    router: routerReducer,
    auth: authReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        storage.removeItem('persist:root')
    }

    return appReducer(state, action)
}

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    pReducer,
    compose(
        applyMiddleware(middleware, socketIoMiddleware(io))
        , window.devToolsExtension && window.devToolsExtension()
    )
);

const persistor = persistStore(store);

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/en-us/foo'))

function WrapperApp() {
    // const { t } = useTranslation();

    useEffect(() => {
        let urlFull = history.location.pathname;
        let urlArray = urlFull.split("/");

        let param = '';

        switch (urlArray[1]) {
            case 'zh-HK':
                param = 'zh-HK';
                break;
            case 'en-US':
                param = 'en-US';
                break;
            default:
                param = 'zh-HK';
        }

        i18n.changeLanguage(param);
    }, []);

    return (
        <App />
    );
}

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            {/* ConnectedRouter will use the store from Provider automatically */}
            <PersistGate persistor={persistor}>
                <I18nextProvider i18n={i18n}>
                    <ConnectedRouter history={history}>
                        <div>
                            <Route path="*" component={WrapperApp} />
                        </div>
                    </ConnectedRouter>
                </I18nextProvider>
            </PersistGate>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
