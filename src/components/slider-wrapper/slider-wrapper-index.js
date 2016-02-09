import {Observable} from 'rx'
import isolate from '@cycle/isolate'
import slider from './slider/slider-index'
import model from './slider-wrapper-model'
import view from './slider-wrapper-view'
import sliderWrapperStyles from './slider-wrapper-styles.scss'

const weightProps$ = Observable.of({
  label: 'Weight', unit: 'kg', min: 40, initial: 70, max: 150
});
const heightProps$ = Observable.of({
  label: 'Height', unit: 'cm', min: 140, initial: 170, max: 210
});


function sliderWrapper(sources) {

  const weightSources = {DOM: sources.DOM, props$: weightProps$};
  const heightSources = {DOM: sources.DOM, props$: heightProps$};


  const weightSlider = isolate(slider)(weightSources);
  const heightSlider = isolate(slider)(heightSources);

  const bmi$ = model(weightSlider.state$, heightSlider.state$);

  const vtree$ = view(bmi$,weightSlider.DOM,heightSlider.DOM);


  return {
    DOM: vtree$,
    state$: bmi$
  }
}

export default sliderWrapper
