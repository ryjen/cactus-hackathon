import { Action } from '@/lib/core/types';

export const action = <Type extends string, Payload = undefined>(type: Type, payload?: Payload): Action<Type, Payload> => ({
    type,
    payload
});
