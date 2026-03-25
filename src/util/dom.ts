/** Emit a custom event that bubbles and crosses shadow DOM boundaries. */
export function emitEvent(target: EventTarget, name: string, detail?: unknown): void {
  target.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail }));
}

/** Shorthand for querySelector that throws if the element is missing. */
export function qs<T extends Element = Element>(selector: string, root: ParentNode = document): T {
  const el = root.querySelector<T>(selector);
  if (!el) throw new Error(`Element not found: ${selector}`);
  return el;
}
