export const getFnDouble = (returnValue: any = undefined) => {
  return function double(...args) {
    double['calledWith'] = double['calledWith'] || []
    double['calledWith'].push(args)
    return returnValue
  }
}

export const getAsyncFnDouble = (returnValue: any = undefined) => {
  return function double(...args) {
    double['calledWith'] = double['calledWith'] || []
    double['calledWith'].push(args)
    return Promise.resolve(returnValue)
  }
}
