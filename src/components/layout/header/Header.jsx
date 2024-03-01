import React from 'react';
import classes from "./style.module.css";

const Header = () => {
    return (
        <header className={classes.header}>
            <nav className={classes.header__navigation}>
                <h1 className={classes.header__logo}>Logo</h1>
                <ul className={classes.header__list}>
                    <li>
                        <a href="">Ссылка</a>
                    </li>
                    <li>
                        <a href="">Ссылка</a>
                    </li>
                    <li>
                        <a href="">Ссылка</a>
                    </li>
                    <li>
                        <a href="">Ссылка</a>
                    </li>

                </ul>
            </nav>
        </header>
    );
};

export default Header;