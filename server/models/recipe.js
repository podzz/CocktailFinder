// ----------------------------------------
// Constructor
// ----------------------------------------

var Recipe = module.exports = function Recipe(_node) {
  this._node = _node
}

// ----------------------------------------
// Attributes
// ----------------------------------------

Object.defineProperty(Recipe.prototype, 'index', {
    get: function () { return this._node.data['index']; },
    set : function(index) { this._node.data['index'] = index; }
});

Object.defineProperty(Recipe.prototype, 'name', {
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
Recipe.prototype.save = function(callback) {
    this._node.save(function(err) {
        callback(err);
    });
};
