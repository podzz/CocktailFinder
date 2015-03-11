// ----------------------------------------
// Constructor
// ----------------------------------------

var Ingredient = module.exports = function Ingredient(_node) {
  this._node = _node
}

// ----------------------------------------
// Attributes
// ----------------------------------------

Object.defineProperty(Ingredient.prototype, 'index', {
    get: function () { return this._node.index; }
});

Object.defineProperty(Ingredient.prototype, 'name', {
    get: function () {
        return this._node.data['name'];
    },
    set: function (name) {
        this._node.data['name'] = name;
    }
});

// ----------------------------------------
// Methods
// ----------------------------------------

// Save the node state
Ingredient.prototype.save = function(callback) {
    this._node.save(function (err) {
        callback(err);
    });
};
