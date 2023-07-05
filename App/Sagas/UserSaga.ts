export function* getUserSaga(action: any) {
  try {
    // Here call Service from UserService
    console.log(action);
    yield action;
  } catch (error) {}
}
