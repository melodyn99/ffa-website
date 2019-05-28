// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import {
//   persistStore
//   // , autoRehydrate 
// } from 'redux-persist';
// import localForage from 'localforage';
// import masterReducer from '../Reducer/masterReducer';

// // const store = createStore(
// //   masterReducer,
// //   compose(applyMiddleware(thunk),
// //     // autoRehydrate(),
// //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// // );

// const store = createStore(
//   masterReducer,
//   compose(applyMiddleware(thunk)
//     // , autoRehydrate()
//   )
// );

// export const configPersist = (callback) => {
//   persistStore(
//     store,
//     {
//       storage: localForage,
//     },
//     callback,
//   );
// };

// // configPersist();

// export default store;
