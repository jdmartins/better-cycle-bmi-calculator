// import {Observable} from 'rx';
// import Cycle from '@cycle/core';
// import {makeDOMDriver, div, input, p, h1} from '@cycle/dom';
//
//
// function main( driver ) {
//   return {
//     // Get and observable from the driver
//     // select click events from the input element
//     DOM: driver.DOM.select('input').events('click')
//       // project the ev and get the checked state
//       .map(ev => ev.target.checked)
//       // kickstart with false
//       .startWith(false)
//       // project the checked state
//       .map(checked =>
//         // return dom elements
//         div([
//           input({type: 'checkbox'}), `${checked}`,
//           // if checked display on : !checked off
//           p(checked ? 'on' : 'off')
//         ])
//       )
//   };
// }
//
//
// // Drivers object
// const drivers = {
//   DOM: makeDOMDriver('#app')
// };
//
//
// Cycle.run(main, drivers);


// import {Observable} from 'rx';
// import Cycle from '@cycle/core';
// import {div, button, h1, h4, a, makeDOMDriver} from '@cycle/dom';
// import {makeHTTPDriver} from '@cycle/http';
//
//
// function main(sources) {
//   const USERS_URL = 'http://jsonplaceholder.typicode.com/users/';
//
//   // Handle response from the HTTP driver
//   const user$ = sources.HTTP
//     .filter(res$ => res$.request.url.indexOf(USERS_URL) === 0)
//     .mergeAll()
//     .map(res => res.body)
//     .startWith(null);
//
//   const vtree$ = user$.map( user =>
//     div('.users', [
//       button('.get-random','Get Random User'),
//       user === null ? null : div('.user-details', [
//         h1('.user-name', user.name),
//         h4('.user-email', user.email),
//         a('.user-website', {href: user.website}, user.website)
//       ])
//     ])
//   );
//
//   // Create the clicks$ from .get-random
//   const click$ = sources.DOM.select('.get-random').events('click');
//
//
//   const getRandomUser$ = click$.map(() => {
//     const randomNumber = Math.round(Math.random()*9)+1;
//     return {
//       url : USERS_URL + String(randomNumber),
//       method : 'GET'
//     };
//   })
//
//   const sinks = {
//     DOM: vtree$,
//     HTTP: getRandomUser$
//   };
//   return sinks;
//
//
// }
//
// const drivers = {
//   DOM : makeDOMDriver('#app'),
//   HTTP : makeHTTPDriver()
// };
//
// Cycle.run(main, drivers);

// import {Observable} from 'rx';
// import Cycle from '@cycle/core';
// import {makeDOMDriver, div, p, button } from '@cycle/dom';
//
// function main({DOM}) {
//
//   const action$ = Observable.merge(
//     DOM.select('.increment').events('click').map(ev => +2),
//     DOM.select('.decrement').events('click').map(ev => 0)
//   );
//
//   const count$ = action$.startWith(2).scan((x,y) => x*y);
//
//   return {
//     DOM: count$.map(count =>
//       div([
//         button('.increment','Increment'),
//         button('.decrement','Decrement'),
//         p('Counter  ' + count)
//       ])
//     )
//   };
// }
//
//
// const drivers = {
//   DOM : makeDOMDriver('#app')
// };
//
// Cycle.run(main, drivers);

import {Observable} from 'rx'
import Cycle from '@cycle/core'
import {makeDOMDriver, div, input, label, h2} from '@cycle/dom'
import sliderWraper from './components/slider-wrapper/slider-wrapper-index'
import mainStyles from './styles/main.scss'

function main(sources) {

  const sliderWrapper$ = sliderWraper(sources);
  const sliderWrapperTree$ = sliderWrapper$.DOM;
  const sliderWrapperState$ = sliderWrapper$.state$;

  const vtree$ = sliderWrapperTree$.withLatestFrom( sliderWrapperState$,
    (sliderWrapperTree,sliderWrapperState) =>
      div('.container', [
        sliderWrapperTree
      ])
  );

  return {
    DOM: vtree$
  }

}


const drivers = {
  DOM : makeDOMDriver('#app')
};


Cycle.run(main,drivers);
