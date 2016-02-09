import view   from './slider-view'
import intent from './slider-intent'
import model  from './slider-model'
import styles from './slider-styles.scss'

function slider({DOM,props$}) {

  const intent$ = intent(DOM , props$);
  const state$ = model(intent$);
  const vtree$ = view(state$,props$);

  return {
    DOM: vtree$,
    state$
  };

}

export default slider
