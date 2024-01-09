/**
 * Custom JSX Renderer
 * This is a simple implementation to demonstrate how a JSX-like renderer works.
 */

/** 
 * Function to create a virtual DOM node.
 * @param {string} tag - The tag name of the node (e.g., 'div', 'span').
 * @param {object} props - The properties/attributes of the node.
 * @param {array} children - The child nodes.
 * @returns {object} - Virtual DOM node.
 */
function createElement(tag, props, ...children) {
  return { tag, props, children };
}

/** 
 * Function to render virtual DOM into actual DOM.
 * @param {object} vNode - The virtual DOM node.
 * @returns {HTMLElement} - The actual DOM element.
 */
function createDOMElement(vNode) {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }

  const element = document.createElement(vNode.tag);
  const { props } = vNode;
  if (props) {
    Object.keys(props).forEach(propName => {
      element.setAttribute(propName, props[propName]);
    });
  }

  vNode.children
    .map(createDOMElement)
    .forEach(childElement => element.appendChild(childElement));

  return element;
}

// Example usage:
const myVirtualDOM = createElement('div', { id: 'main-container' },
  createElement('h1', null, 'Welcome to My Custom Renderer!'),
  createElement('p', null, 'This is a paragraph in my custom DOM renderer.')
);

const actualDOM = createDOMElement(myVirtualDOM);
document.body.appendChild(actualDOM);

// Dynamic List Rendering
const myItems = ['Apple', 'Banana', 'Cherry'];
const myList = createElement('ul', null,
  ...myItems.map(item => createElement('li', null, item))
);

document.body.appendChild(createDOMElement(myList));

