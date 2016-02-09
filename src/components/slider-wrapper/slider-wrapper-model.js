import {Observable} from 'rx';

/* ---
  Slider Wrapper View
--- */

function model (weightVal$, heightVal$) {
  return Observable.combineLatest(
    weightVal$, heightVal$,
    (weight,height) => {
      const heightMeters = height * 0.01;
      return Math.round(weight / (heightMeters * heightMeters));
    }
  );

}

export default model
