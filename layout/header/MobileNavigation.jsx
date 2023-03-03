import React from 'react'
import { BiChevronDown } from 'react-icons/bi'

const MobileNavigationDropdown = ({ menuList }) => {
    return (
        <ul className="mobile_navigation">
            {
                menuList.map((menu) => {
                    return <li key={menu.label} className={`mobile_navigation-item ${menu.children ? "hasSubs" : ""} `}>
                        {menu.icon} {menu.label} {menu.children ? <BiChevronDown className="subsArrow" /> : ""} 
                        {
                            menu.children && <div className="mobile_navigation-item_submenu">
                                {
                                    menu.children.map((item) => {
                                        return <div className="mobile_navigation-item_submenu_section" key={item.title}>
                                            <h4 className="">
                                                {item.title}
                                            </h4>
                                            <ul className="mobile_navigation-item_submenu_section-list">
                                                {item.menu.map((item) => 
                                                    <li key={item.label} className="">
                                                        {item.label}
                                                    </li>
                                                )}
                                            </ul>

                                        </div>
                                    })
                                }
                            </div>

                        }

                    </li>
                })

            }
        </ul>
    )
}

export default MobileNavigationDropdown