import { TrackedMap, TrackedWeakMap, TrackedSet, TrackedWeakSet } from 'tracked-maps-and-sets';

import { module, test } from 'qunit';

module('TrackedMap', () => {
  test('instanceof works correctly', assert => {
    let map = new TrackedMap();
    let set = new TrackedSet();
    let weakMap = new TrackedWeakMap();
    let weakSet = new TrackedWeakSet();

    assert.ok(map instanceof Map, 'map is instanceof Map');
    assert.ok(set instanceof Set, 'set is instanceof Set');
    assert.ok(weakMap instanceof WeakMap, 'weakMap is instanceof WeakMap');
    assert.ok(weakSet instanceof WeakSet, 'weakSet is instanceof WeakSet');

    assert.notOk(map instanceof TrackedMap, 'map is not instanceof TrackedMap');
    assert.notOk(set instanceof TrackedSet, 'set is not instanceof TrackedSet');
    assert.notOk(weakMap instanceof TrackedWeakMap, 'weakMap is not instanceof TrackedWeakMap');
    assert.notOk(weakSet instanceof TrackedWeakSet, 'weakSet is not instanceof TrackedWeakSet');
  });
});
