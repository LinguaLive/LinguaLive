import { createContext } from 'react';
import { Calls } from '../../models/Calls';

export const DBContext = createContext<any>(null);

export default function DBProvider({ children }: { children: React.ReactNode }) {
  let update;

  Calls.watch().on('change', data => update = data);

  return (
    <DBContext.Provider value={{update}}>{children}</DBContext.Provider>
  )
};