
function intent(DOMSources,props$) {

  const initialValue$ = props$
    .map(props => props.initial)
    .first();

  const lastValue$ = DOMSources
    .select('.slider')
    .events('input')
    .map(ev => ev.target.value);


  return { i$: initialValue$,l$: lastValue$};

}

export default intent
