const React = {
    createElement: (tag, props, ...children) => {
        if (typeof tag == "function") {
            try {
                return tag(props)
            } catch ({ promise, key }) {
                promise.then(data => {
                    PromiseCache.set(key, data)
                    rerender()
                })
                return { tag: 'h1', props: { children: [ "I am loading" ] } }
            }

        }
        let element = { tag, props: { ...props, children } }
        return element

    }
}
const states = []
let stateCursor = 0

const useState = (initialState) => {
    const FREEZECURSOR = stateCursor

    states[ FREEZECURSOR ] = states[ FREEZECURSOR ] || initialState

    let setState = (newState) => {
        states[ FREEZECURSOR ] = newState
        rerender()
    }
    stateCursor++

    return [ states[ FREEZECURSOR ], setState ]

}

const PromiseCache = new Map()
const createResource = (promise, key) => {
    if (PromiseCache.has(key)) {
        return PromiseCache.get(key)
    }
    throw {
        promise: promise(), key
    }
}

const App = () => {
    const [ name, setName ] = useState("person")
    const [ count, setCount ] = useState(0)

    const dogPhotoUrl = createResource(
        () => fetch('https://dog.ceo/api/breeds/image/random')
            .then(r => r.json())
            .then(payload => payload.message), 'dogPhoto'
    )

    return (
        <div classname="react-2020">
            <h1> Hello, { name } </h1>
            <input type="text" placeholder="name" value={ name } onchange={ e => setName(e.target.value) }></input>
            <h2>The count is: { count }</h2>
            { dogPhotoUrl }
            <img src={ dogPhotoUrl }></img>
            <button onclick={ () => setCount(count + 1) }>+</button>
            <button onclick={ () => setCount(count - 1) }>-</button>

            <p>Exercitation pariatur adipisicing dolor in eiusmod nisi sunt et labore enim est enim fugiat. Mollit consequat veniam sunt nisi exercitation sit duis adipisicing eiusmod. Est nostrud est eu do culpa et cillum elit in. Irure est pariatur do laborum consequat consequat officia proident eu. Esse ad ea mollit elit reprehenderit ullamco adipisicing aliquip commodo. Tempor ut ea ad mollit labore enim laborum Lorem. </p>
        </div>
    )
}

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

const rerender = () => {
    stateCursor = 0
    document.querySelector('#app').firstChild.remove()
    render(< App />, document.querySelector('#app'))
}
render(< App />, document.querySelector('#app'))