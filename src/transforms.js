import { createTransform } from "redux-persist";

const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // convert mySet to an Array.
    console.log(inboundState);
    return { ...inboundState, mySet: [...inboundState.mySet] };
  },
  // transform state being rehydrated
  (outboundState, key) => {
    // convert mySet back to a Set.
    console.log(outboundState);
    return { ...outboundState, mySet: new String(outboundState.mySet) };
  },
  // define which reducers this transform gets called for.
  { whitelist: ["tokenReducer"] }
);

export default SetTransform;
