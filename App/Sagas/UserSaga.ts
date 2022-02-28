export function* getUserSaga(action: any) {
  try {
    // Here call Service from UserService
    console.log(action);
  } catch (error) {}
}
