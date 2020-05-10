export default function (state = "", action) {
  if (action.type === "GET_TOKEN") {
    return {
      ...state,
      token: action.payload,
    };
  }
}
