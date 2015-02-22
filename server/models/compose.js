// ----------------------------------------
// Constructor
// ----------------------------------------
var Compose = module.exports = function Compose(_node) {
  this._node = _node
}

// ----------------------------------------
// Attributes
// ----------------------------------------
Object.defineProperty(Compose.prototype, 'quantity', {
    get: function () { return this._node.data['quantity']; },
    set : function(quantity) { this._node.data['unity'] = quantity; }
});

Object.defineProperty(Compose.prototype, 'unity', {
    get: function () { return this._node.data['unity']; },
    set: function (unity) { this._node.data['unity'] = unity; }
});

// ----------------------------------------
// Methods
// ----------------------------------------

// Save the node state
Compose.prototype.save = function(callback) {
    this._node.save(function(err) {
        callback(err);
    });
};
