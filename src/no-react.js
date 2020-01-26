/*
Reference: 
https://medium.com/@sometimes_react/svg-with-jsx-without-react-fc922d7304e4
https://stackoverflow.com/a/42405694
*/

function isSVG(element) {
    const patt = new RegExp('^' + element + '$', 'i')
    const SVGTags = ['path', 'svg', 'use', 'g', 'text']
    return SVGTags.some(tag => patt.test(tag))
  }

const React = {
    createElement: function (tag, attrs, children) {
        var element = isSVG(tag)
        ? document.createElementNS('http://www.w3.org/2000/svg', tag)
        : document.createElement(tag);

        for (let name in attrs) {
            if (name && attrs.hasOwnProperty(name)) {
                let value = attrs[name];
                if (value === true) {
                    element.setAttribute(name, name);
                } else if (value !== false && value != null) {
                    element.setAttribute(name, value.toString());
                }
            }
        }
        for (let i = 2; i < arguments.length; i++) {
            let child = arguments[i];
            element.appendChild(
                child.nodeType == null ?
                    document.createTextNode(child.toString()) : child);
        }
        return element;
    }
};

window.React = React;