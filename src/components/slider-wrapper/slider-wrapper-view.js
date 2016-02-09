import {Observable} from 'rx';
import {div, h4, h1} from '@cycle/dom';

/* ---
  Slider Wrapper View
--- */

function view(bmi$,weightVTree$,heightVTree$) {
  return bmi$.combineLatest( weightVTree$,heightVTree$,
    (bmi,weightVTree,heightVTree) =>
      div('.slider-wrapper',[
        h4('.slider-wrapper-title',{},'BMI CALCULATOR'),
        div('.slider-wrapper-inner',[
          weightVTree,
          heightVTree,
          h1('.slider-wrapper-result',{style:
            {
              fontSize:String(bmi*2)+'px',
              color: `hsl(${String(bmi)*4.6},70%,70%)`,
            }
          }, bmi)
        ]),
      ])
    );
}

export default view;
