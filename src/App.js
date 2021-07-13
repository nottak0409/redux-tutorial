import React from 'react'
import Header from './features/header/Header'
import TodoList from './features/todos/TodoList'

function App() {
    return (
        <div className="App">
            <nav>
                <section>
                    <h1>Redux Fundamentals Example</h1>

                    <div className="navContent">
                        <div className="navLinks"></div>
                    </div>
                </section>
            </nav>
            <section>
                <h2>Todos</h2>
                    <div className="todoapp">
                        <Header />
                        <TodoList />
                    </div>
            </section>
        </div>
    );
}

export default App;
