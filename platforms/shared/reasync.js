import {
  createResolver,
  createClientResolver as _createClientResolver,
  createTransitionHook,
  PRE_RESOLVE_HOOK,
  DEFER_RESOLVE_HOOK
} from 'reasync';

export const createServerResolver = () => {
  const resolver = createResolver();
  resolver
    .addHooks(PRE_RESOLVE_HOOK)
    .addHooks(DEFER_RESOLVE_HOOK)
    .addHooks(createTransitionHook());

  if (__DEVELOPMENT__) {
    resolver.setErrorHandler((e) => console.log(e));
  }

  return resolver;
};

export const createClientResolver = (history, routes, { getState, dispatch }) => {
  const resolver = _createClientResolver(history, routes, { getState, dispatch });

  resolver.addHooks(PRE_RESOLVE_HOOK)
    .addHooks(createTransitionHook(), DEFER_RESOLVE_HOOK);

  if (__DEVELOPMENT__) {
    resolver.setErrorHandler((e) => console.log(e));
  }

  return resolver;
};
