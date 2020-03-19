const React = {
    createElement: (tag, props, ...children) => {
        if (typeof tag == "function") {
            return tag(props)
        }
        let element = { tag, props: { ...props, children } }
        return element

    }
}
const App = () => (
    <div classname="react-2020">
        <h1> Hello, Person </h1>
        <input type="text" placeholder="name"></input>
        <p>Exercitation pariatur adipisicing dolor in eiusmod nisi sunt et labore enim est enim fugiat. Mollit consequat veniam sunt nisi exercitation sit duis adipisicing eiusmod. Est nostrud est eu do culpa et cillum elit in. Irure est pariatur do laborum consequat consequat officia proident eu. Esse ad ea mollit elit reprehenderit ullamco adipisicing aliquip commodo. Tempor ut ea ad mollit labore enim laborum Lorem. </p>
    </div>
);

const render = (reactElement, container) => {
    const actualDomElement = document.createElement(reactElement.tag)

    if ([ "string", "number" ].includes(typeof reactElement)) {
        container.appendChild(document.createTextNode(String(reactElement)))
        return
    }
    if (reactElement.props) {
        Object.keys(reactElement.props).filter(p => p !== 'children').forEach(p => actualDomElement[ p ] = reactElement.props[ p ])
    }
    if (reactElement.props.children) {
        reactElement.props.children.forEach(child => render(child, actualDomElement))
    }
    container.appendChild(actualDomElement)
}
render(< App />, document.querySelector('#app'))