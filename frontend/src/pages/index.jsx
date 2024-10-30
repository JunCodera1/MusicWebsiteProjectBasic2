import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './components/Home';
import Feed from './components/Feed';
import Library from './components/Library';
import Upload from './components/Upload';
import style from '../styles/index.module.css';

const App = () => {
    return (
        <ChakraProvider>
            <Router>
                <div className={style.container}>
                    <nav className={style.navbar_container}>
                        <Link to='/' className={style.nav_logo}>
                            <img src={Logo} alt='logo' />
                        </Link>
                        <div className={style.nav_links}>
                            <Link to='/home' className={style.links}>Home</Link>
                            <Link to='/feed' className={style.links}>Feed</Link>
                            <Link to='/library' className={style.links}>Library</Link>
                            <Link to='/upload' className={style.links}>Upload</Link>
                        </div>
                    </nav>
                    <Switch>
                        <Route path='/home' component={Home} />
                        <Route path='/feed' component={Feed} />
                        <Route path='/library' component={Library} />
                        <Route path='/upload' component={Upload} />
                    </Switch>
                </div>
            </Router>
        </ChakraProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));