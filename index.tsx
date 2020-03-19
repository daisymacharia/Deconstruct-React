const React = {
    createElement: (tag, props, ...children) => {
        let element = {tag, props: {...props, children}}

        console.log(element);
        return element
        
    }
}
const a = <div classname="react-2020">
    <h1> Hello, Person </h1>
    <p>lorem ipsum blah blah blah</p>
</div>