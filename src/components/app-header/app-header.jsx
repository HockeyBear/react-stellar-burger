import React from "react";
import headerStyles from "./app-header.module.css";
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
    return (
        <>
            <header className={`${headerStyles.header} pb-4 pt-4`}>
                <a href="/" className={headerStyles.header_logo}>
                    <Logo />
                </a>
                <nav className={`${headerStyles.header_menu_con} pl-5 pr-5`}>
                    <div className={headerStyles.header_menu}>
                        <a href="/" className={headerStyles.header_con}>
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default">Конструктор</p>
                        </a>
                        <a href="/" className={headerStyles.header_con}>
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                        </a>
                        <a href="/" className={headerStyles.header_con}>
                            <ProfileIcon  type="secondary" />
                        <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
                        </a>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default AppHeader;