import { tracked } from '@glimmer/tracking';
import { get, notifyPropertyChange } from '@ember/object';

class Tag {
  @tracked private __tag_value__: undefined;

  static consumeTag(tag: Tag) {
    // read the tag value
    tag.__tag_value__;
  }

  static dirtyTag(tag: Tag) {
    // write the tag value
    tag.__tag_value__ = undefined;
  }
}

export function createTag() {
  return new Tag();
}

export const consumeTag = Tag.consumeTag;
export const dirtyTag = Tag.dirtyTag;

////////////

export function consumeCollection(obj: object) {
  get(obj as { '[]': unknown }, '[]');
}

export function dirtyCollection(obj: object) {
  notifyPropertyChange(obj, '[]')
}

////////////

const OBJECT_TAGS = new WeakMap<object, Map<unknown, Tag>>();

function getOrCreateTag(obj: object, key: unknown) {
  let tags = OBJECT_TAGS.get(obj);

  if (tags === undefined) {
    tags = new Map();
    OBJECT_TAGS.set(obj, tags);
  }

  let tag = tags.get(key);

  if (tag === undefined) {
    tag = new Tag();
    tags.set(key, tag);
  }

  return tag;
}

export function consumeKey(obj: object, key: unknown) {
  consumeTag(getOrCreateTag(obj, key));
}

export function dirtyKey(obj: object, key: unknown) {
  dirtyTag(getOrCreateTag(obj, key));
}

//////////

export function createDebugProxy(target: any, constructor: any) {
  return new Proxy(target, {
    get(target, prop) {
      if (typeof (target as any)[prop] === 'function') {
        return (target as any)[prop].bind(target);
      }

      return (target as any)[prop];
    },

    getPrototypeOf() {
      return constructor.prototype;
    }
  })
}
