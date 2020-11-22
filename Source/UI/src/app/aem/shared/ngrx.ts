import { Action, ActionReducerMap } from '@ngrx/store';

export function callNestedReducers<TState>(state: TState, action: Action, reducers: Partial<ActionReducerMap<TState, any>>): TState {
    let hasChanged = false;
    const newState = Object.keys(reducers).reduce((existingState, key) => {
      const propertyKey = key as keyof TState;
      const reducer = reducers[propertyKey];
      const childState = state[propertyKey];
      const newChildState = reducer!(childState, action);
      hasChanged = hasChanged || newChildState !== childState;
      existingState[propertyKey] = newChildState;
      return existingState;
    }, { ...state });
  
    return hasChanged ? newState : state;
  }