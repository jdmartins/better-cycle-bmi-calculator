
function intent(DOMSource,props$) {

  const initialValue$ = $
    .map(props => props.initial)
    .first();

  const lastValue$ = DOMSource
    .select('.slider')
    .events('input')
    .map(ev => ev.target.value);


  return { i$: initialValue$,l$: lastValue$};

}

export default intent
