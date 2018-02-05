class RBAC {
  constructor(roles) {
    this.init(opts);
  }

  init(roles) {
    if(typeof roles !== 'object') {
      throw new TypeError('Expected an object as input');
    }

    this.roles = roles;
    let map = {};
    Object.keys(roles).forEach(role => {
      map[role] = {
        can: {}
      };
      if(roles[role].inherits) {
        map[role].inherits = roles[role].inherits;
      }

      roles[role].can.forEach(operation => {
        if(typeof operation === 'string') {
          map[role].can[operation] = 1;
        } else if(typeof operation.name === 'string'
            && typeof operation.when === 'function') {
            map[role].can[operation.name] = operation.when;
        }
      });
    });

    this.roles = map;
  }
}

module.exports = RBAC;
