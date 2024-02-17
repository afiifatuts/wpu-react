/* eslint-disable react/prop-types */
export default function Header({name}) {
    return <h1>Hello, world!{name?name :'WPU'}</h1>;
}