import React from 'react';
import classes from "./style.module.css";

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div>
                <ul className={classes.footer__list}>
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
            </div>
        </footer>
    );
};

export default Footer;