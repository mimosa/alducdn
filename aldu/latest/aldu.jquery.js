(function( $ ){
  $.fn.autoload = function( plugin, options, each ) {
    if (typeof options === 'function') {
      each = options;
      options = {};
    }
    if (this.length) {
      if (Aldu.isObject(plugin)) {
        Aldu.chain(Aldu.CDN.require, plugin, function(jq, each) {
          jq.each(each);
        }, [ this, each ]);
      }
      else {
        Aldu.CDN.require(plugin, options, function(jq, each) {
          jq.each(each);
        }, [ this, each ]);
      }
    }
    return this;
  };
  $.escape = function(expression) {
    return expression.replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, '\\$&');
  };
  $.fn.alduphp = function() {
    var shift = Array.prototype.shift;
    var keys = shift.call(arguments).split('.');
    switch (keys.shift()) {
    case 'form':
      switch (keys.shift()) {
      case 'element':
        var options = shift.call(arguments);
        var model = options.model || this.data('model');
        var index = options.index || this.data('index');
        var name = options.name;
        var target = model + '[' + index + '][' + name + ']';
        return $('[name="' + $.escape(target) + '"]');
      }
    }
    return this;
  };
})( jQuery );