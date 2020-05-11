import React from 'react';
import axios from 'axios';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var InlineStyles = {
  input: {
    width: '100%',
    fontSize: '2.5rem'
  }
};

var InputWidget = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(InputWidget, _React$Component);

  function InputWidget() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = InputWidget.prototype;

  _proto.onChange = function onChange(event) {
    if (this.props.onChange) this.props.onChange(event.target.value);
  };

  _proto.render = function render() {
    var _this = this;

    return React.createElement("input", {
      className: "widget-input",
      style: InlineStyles.input,
      type: this.props.type,
      placeholder: this.props.placeholder,
      name: this.props.name,
      ref: this.props.refe,
      onChange: function onChange(e) {
        return _this.onChange(e);
      }
    });
  };

  return InputWidget;
}(React.Component);

var HttpService = /*#__PURE__*/function () {
  function HttpService() {}

  var _proto = HttpService.prototype;

  _proto.get = function get(url, filters) {
    if (filters === void 0) {
      filters = {};
    }

    return axios.get(url, {
      params: filters
    }).then(function (response) {
      return response.data;
    });
  };

  return HttpService;
}();

var InlineStyles$1 = {
  select: {
    width: '100%',
    fontSize: '2rem'
  }
};

var SelectWidget = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(SelectWidget, _React$Component);

  function SelectWidget() {
    var _this;

    _this = _React$Component.apply(this, arguments) || this;
    _this._httpService = new HttpService();
    _this.state = {
      selected: -1,
      data: []
    };
    return _this;
  }

  SelectWidget.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (props.data !== state.data && !props.endpoint) {
      return {
        data: props.data
      };
    }

    return null;
  };

  var _proto = SelectWidget.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var url = this.props.endpoint;
    if (url) this.getData(url);
  };

  _proto.getData = function getData(url) {
    var _this2 = this;

    if (url) {
      this._httpService.get(url).then(function (response) {
        _this2.setState({
          data: response || []
        });
      });
    }
  };

  _proto.handleSelectChange = function handleSelectChange(event) {
    var id = Number(event.target.value);
    if (this.props.onChange) this.props.onChange(id);
    this.setState({
      selected: id
    });
  };

  _proto.render = function render() {
    var _this3 = this;

    return React.createElement("select", {
      className: "widget-select",
      style: InlineStyles$1.select,
      value: this.props.changeValue ? this.state.selected : -1,
      onChange: function onChange(e) {
        return _this3.handleSelectChange(e);
      }
    }, React.createElement("option", {
      value: -1,
      disabled: true
    }, this.props.placeholder || "Pick"), this.state.data.map(function (entity) {
      return React.createElement("option", {
        key: entity.id,
        value: entity.id
      }, entity.name);
    }));
  };

  return SelectWidget;
}(React.Component);

var InlineStyles$2 = {
  error: {
    color: 'red',
    font_weight: 'bold',
    fontSize: '1.5rem'
  }
};

var ErrorWidget = function ErrorWidget(props) {
  return React.createElement("div", {
    className: "widget-error",
    style: _extends(_extends({}, InlineStyles$2.error), props.customStyle)
  }, props.text);
};

export { ErrorWidget, InputWidget, SelectWidget };
//# sourceMappingURL=index.modern.js.map
