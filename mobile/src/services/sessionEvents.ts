type Listener = () => void; let listener: Listener | undefined;
export const sessionEvents = { onUnauthorized: (next: Listener) => { listener = next; return () => { listener = undefined; }; }, unauthorized: () => listener?.() };
