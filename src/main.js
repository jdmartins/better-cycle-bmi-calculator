import {Observable} from 'rx'
import Cycle from '@cycle/core'
import {makeDOMDriver, div, input, label, h2} from '@cycle/dom'
import sliderWraper from './components/slider-wrapper/slider-wrapper-index'
import mainStyles from './styles/main.scss'

function main(sources) {

  const sliderWrapper$ = sliderWraper(sources);
  const sliderWrapperTree$ = sliderWrapper$.DOM;
  const sliderWrapperState$ = sliderWrapper$.state$;

  const vtree$ = sliderWrapperTree$.map( (SliderWrapperTree) =>
      div('.container', [
        SliderWrapperTree
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
