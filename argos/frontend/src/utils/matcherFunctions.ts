import { AnyAction } from '@reduxjs/toolkit';

export const isPending = (action: AnyAction) => {
  return action.type.endsWith('pending');
};

export const isFulfilled = (action: AnyAction) => {
  return action.type.endsWith('fulfilled');
};

export const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};
