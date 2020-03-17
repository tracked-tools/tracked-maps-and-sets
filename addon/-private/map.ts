import { DEBUG } from '@glimmer/env';
import {
  consumeKey,
  consumeCollection,
  dirtyKey,
  dirtyCollection,
  createDebugProxy,
} from './util';

const SELF: unique symbol = DEBUG && typeof Symbol === 'function' ? Symbol() : undefined as any;

export class TrackedMap<K = any, V = any> extends Map<K, V> {
  [SELF]: TrackedMap<K, V>;

  constructor(entries?: Iterable<readonly [K, V]>) {
    super(entries as any);

    if (DEBUG && typeof Proxy === 'function') {
      this[SELF] = createDebugProxy(this, Map);

      return this[SELF];
    }
  }

  // **** KEY GETTERS ****
  get(key: K) {
    consumeKey(this, key);

    return super.get(key);
  }

  has(key: K) {
    consumeKey(this, key);

    return super.has(key);
  }

  // **** ALL GETTERS ****
  entries() {
    consumeCollection(DEBUG ? this[SELF] : this);

    return super.entries();
  }

  keys() {
    consumeCollection(DEBUG ? this[SELF] : this);

    return super.keys();
  }

  values() {
    consumeCollection(DEBUG ? this[SELF] : this);

    return super.values();
  }

  forEach(fn: (value: V, key: K, map: this) => void) {
    consumeCollection(DEBUG ? this[SELF] : this);

    super.forEach(fn);
  }

  get size() {
    consumeCollection(DEBUG ? this[SELF] : this);

    return super.size;
  }

  // **** KEY SETTERS ****
  set(key: K, value: V) {
    dirtyKey(this, key);
    dirtyCollection(DEBUG ? this[SELF] || this : this);

    return super.set(key, value);
  }

  delete(key: K) {
    dirtyKey(this, key);
    dirtyCollection(DEBUG ? this[SELF] : this);

    return super.delete(key);
  }

  // **** ALL SETTERS ****
  clear() {
    super.forEach((_v, k) => dirtyKey(this, k));
    dirtyCollection(DEBUG ? this[SELF] : this);

    return super.clear();
  }
}

if (typeof Symbol !== undefined) {
  let originalIterator = TrackedMap.prototype[Symbol.iterator];

  Object.defineProperty(TrackedMap.prototype, Symbol.iterator, {
    get() {
      consumeCollection(DEBUG ? this[SELF] : this);
      return originalIterator;
    }
  });
}

export class TrackedWeakMap<K extends object = object, V = any> extends WeakMap<
  K,
  V
> {
  constructor(entries?: Iterable<[K, V]>) {
    super(entries as any);

    if (DEBUG && typeof Proxy === 'function') {
      return createDebugProxy(this, WeakMap);
    }
  }

  get(key: K) {
    consumeKey(this, key);

    return super.get(key);
  }

  has(key: K) {
    consumeKey(this, key);

    return super.has(key);
  }

  set(key: K, value: V) {
    dirtyKey(this, key);

    return super.set(key, value);
  }

  delete(key: K) {
    dirtyKey(this, key);

    return super.delete(key);
  }
}
