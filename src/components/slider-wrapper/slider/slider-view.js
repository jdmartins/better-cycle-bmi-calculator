import {Observable} from 'rx';
import {div, label, input,strong} from '@cycle/dom'


function view(state$,props$) {

  const vtree$ = Observable.combineLatest(props$, state$,
    (props, value) =>
      div('.labeled-slider', [
        label('.label', {for:'.slider'},`${props.label} ${value}${props.unit}`),
        input('.slider', {
          type: 'range', min: props.min, max: props.max, value: value
        })
      ])
  );

  return vtree$;

}

export default view
