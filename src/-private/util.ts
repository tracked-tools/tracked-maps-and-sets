import { tracked } from '@glimmer/tracking';
import { gte } from 'ember-compatibility-helpers';

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

const COLLECTION_SYMBOL = {};

export let consumeCollection = (obj: object): void => {
  consumeKey(obj, COLLECTION_SYMBOL);
};

export let dirtyCollection = (obj: object): void => {
  dirtyKey(obj, COLLECTION_SYMBOL);
};

declare const Ember: any;

if (!gte('3.24.0')) {
  // eslint-disable-next-line ember/new-module-imports
  consumeCollection = (obj): void => Ember.get(obj, '[]');
  // eslint-disable-next-line ember/new-module-imports
  dirtyCollection = (obj): void => Ember.notifyPropertyChange(obj, '[]');
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
