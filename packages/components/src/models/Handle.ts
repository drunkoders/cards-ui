import { ForwardRefExoticComponent, RefAttributes } from 'react';

/** Type utility that defines a handle reference on React components */
export type Handle<T> = T extends ForwardRefExoticComponent<RefAttributes<infer T2>> ? T2 : never;
