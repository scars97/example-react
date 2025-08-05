import './App.css';
import {useState} from "react";

function Header(props) {
    return (
        <header>
            <h1><a href="/" onClick={(event) => {
                event.preventDefault();
                props.onChangeMode();
            }}>{props.title}</a></h1>
        </header>
    );
}

function Nav(props) {
    const list = []
    for (let i = 0; i < props.topics.length; i++) {
        let t = props.topics[i]
        list.push(<li key={t.id}>
            <a id={t.id} href={'/read/' + t.id} onClick={event=>{
                event.preventDefault();
                props.onChangeMode(Number(event.target.id));
            }}>{t.title}</a>
        </li>)
    }

    return (
        <nav>
            <ol>
                {list}
            </ol>
        </nav>
    );
}

function Article(props) {
    return (
        <article>
            <h2>{props.title}</h2>
            {props.body}
        </article>
    );
}

function App() {
    const [mode, setMode] = useState('WELCOME');
    const [id, setId] = useState(null);

    const topics = [
        {id:1, title:'html', body:'html is ...'},
        {id:2, title:'css', body:'css is ...'},
        {id:3, title:'javascript', body:'javascript is ...'}
    ];

    let content = null;
    if (mode === 'WELCOME') {
        content = <Article title="WELCOME" body="Hello, WEB"/>
    } else if (mode === 'READ') {
        let title, body = null;
        for (let i = 0; i < topics.length; i++) {
            if (id === topics[i].id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Article title={title} body={body}/>
    }

    return (
        <div className="App">
            <Header title="REACT" onChangeMode={() => {
                setMode('WELCOME');
            }}/>
            <Nav topics={topics} onChangeMode={(id) => {
                setMode('READ');
                setId(id)
            }}/>
            {content}
        </div>
    );
}

export default App;
