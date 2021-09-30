tracked-maps-and-sets
==============================================================================

> **IMPORTANT: This addon supports IE 11 or older browsers. If you
> don't need to support them, consider using [tracked-built-ins](https://github.com/pzuraq/tracked-built-ins)
> instead.**

This addon provides tracked versions of JavaScript's Maps and Sets:

```js
import {
  TrackedMap,
  TrackedWeakMap,
  TrackedSet,
  TrackedWeakSet,
} from 'tracked-maps-and-sets';
```

These classes have the same APIs as their native equivalents, but reading from
them or writing to them will be tracked, allowing you to use them in your Ember
apps and have changes automatically propagate!


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v2.13 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install tracked-maps-and-sets
```


Usage
------------------------------------------------------------------------------

See the MDN documentation for each class to learn more about it:

- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

All public APIs are the same, and they will also return true in `instanceof`
checks against the base datatype.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
