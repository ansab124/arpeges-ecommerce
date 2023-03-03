import React, { useState, useEffect } from "react";
import {
  FaPhoneVolume,
  FaSearch,
  FaBoxOpen,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { BiShoppingBag } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { CgMenu } from "react-icons/cg";
import { Accordeon } from "../../components/dropdownSvgs/Accordeon";
import Icon from "@ant-design/icons";
import { Batterie } from "../../components/dropdownSvgs/Batterie";
import { Eveil } from "../../components/dropdownSvgs/Eveil";
import { Percussions } from "../../components/dropdownSvgs/Percussions";
import { SonoHome } from "../../components/dropdownSvgs/SonoHome";
import { Guitares } from "../../components/dropdownSvgs/Guitares";
import { EveilMusical } from "../../components/dropdownSvgs/EveilMusical";
import { Cuivres } from "../../components/dropdownSvgs/Cuivres";
import { Cordes } from "../../components/dropdownSvgs/Cordes";
import { Claviers } from "../../components/dropdownSvgs/Claviers";
import { Bois } from "../../components/dropdownSvgs/Bois";
import { useRouter } from "next/router";
import NavigationDropdown from "./NavigationDropdown";
import MobileNavigationDropdown from "./MobileNavigation";
import Link from "next/link";
import MobileNavigationDrilldown from "./MobileNavigationDrilldown";
import { getCmsPagesSlug, getInstrumentsMenu } from "@actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const Header = () => {
  const userData = useSelector((state) => state.user.info);
  const cartDetails = useSelector((state) => state.cart.details);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [activeTabTwo, setActiveTabTwo] = useState(1);
  const [instrumentsMenu, setInstrumentMenu] = useState([]);
  const [servicesMenu, setServicesMenu] = useState([]);
  const AccordeonIcon = (props) => <Icon component={Accordeon} {...props} />;
  const BatterieIcon = (props) => <Icon component={Batterie} {...props} />;
  const EveilIcon = (props) => <Icon component={Eveil} {...props} />;
  const PercussionsIcon = (props) => (
    <Icon component={Percussions} {...props} />
  );
  const SonoHomeIcon = (props) => <Icon component={SonoHome} {...props} />;
  const GuitaresIcon = (props) => <Icon component={Guitares} {...props} />;
  const EveilMusicalIcon = (props) => (
    <Icon component={EveilMusical} {...props} />
  );
  const CuivresIcon = (props) => <Icon component={Cuivres} {...props} />;
  const CordesIcon = (props) => <Icon component={Cordes} {...props} />;
  const ClaviersIcon = (props) => <Icon component={Claviers} {...props} />;
  const BoisIcon = (props) => <Icon component={Bois} {...props} />;

  const getServiceSectionSlugs = async () => {
    const response = await getCmsPagesSlug();
    setServicesMenu(
      response?.map((item, index) => ({
        key: "services-" + item?.title,
        label: item?.title,
        href: `/cms/${item?.slug}`,
      })) || []
    );
  };

  // console.log({ servicesMenu });

  useEffect(() => {
    getServiceSectionSlugs();
  }, []);

  const MENU_LIST = [
    {
      label: "accordÉons",
      key: "1",
      icon: (
        <AccordeonIcon
          className="ms-4 color_change"
          style={{ height: "27px", width: "31px" }}
        />
      ),
    },

    {
      label: "batteries / fanfare",
      key: "2",
      icon: (
        <BatterieIcon
          className="ms-4 color_change"
          style={{ height: "27px", width: "31px" }}
        />
      ),
    },
    {
      label: "bios [groupe]",
      key: "3",
      icon: (
        <BoisIcon
          className="ms-4 color_change"
          style={{ height: "27px", width: "31px" }}
        />
      ),
      children: [
        {
          title: "bois [groupe appelle familles]",
          menu: [
            {
              label: "Bassons / Faggots",
              href: "/intrument/test",
            },
            {
              label: "Accessoires Bassons / Fagotts",
              href: "/intrument/test",
            },
            {
              label: "Saxophones",
              href: "/intrument/test",
            },
            {
              label: "Accessoires Saxophones",
              href: "/intrument/test",
            },
            {
              label: "Flûtes à bec",
              href: "/intrument/test",
            },
            {
              label: "Accessoires",
              href: "/intrument/test",
            },
            {
              label: "Hautbois",
              href: "/intrument/test",
            },
            {
              label: "Accessoires Hautbois",
              href: "/intrument/test",
            },
            {
              label: "Clarinettes",
              href: "/intrument/test",
            },
            {
              label: "Accessoires Clarinettes",
              href: "/intrument/test",
            },
            {
              label: "Flûtes",
              href: "/intrument/test",
            },
            {
              label: "Accessoires Flûtes",
              href: "/intrument/test",
            },
            {
              label: "Accessoires Bois",
              href: "/intrument/test",
            },
          ],
        },
        {
          title: " CLARINETTES [FAMILLE APPELLE SOUS-FAMILLES]",
          menu: [
            {
              label: "Clarinettes SIB",
            },
            {
              label: "Clarinettes LA",
            },
            {
              label: "Clarinettes UT",
            },
            {
              label: "Clarinettes MIB RE",
            },
            {
              label: "Clarinettes basses contrebasses",
            },
            {
              label: "Clarinettes altos contraltos",
            },
            {
              label: "Clarinettes LA de basset",
            },
            {
              label: "Cors de basset",
            },
          ],
        },
      ],
    },
    {
      label: "CLAVIERS",
      key: "4",
      icon: (
        <ClaviersIcon
          className="ms-4 color_change"
          style={{ height: "27px", width: "31px" }}
        />
      ),
    },
    {
      label: "CORDES",
      key: "5",
      icon: (
        <CordesIcon
          className="ms-4 color_change"
          style={{ height: "27px", width: "31px" }}
        />
      ),
    },
    {
      label: "CUIVRES",
      key: "6",
      icon: (
        <CuivresIcon
          className="ms-4 color_change"
          style={{ height: "27px", width: "31px" }}
        />
      ),
    },
    {
      label: "DIVERS ACCESSOIRES",
      key: "7",
      icon: (
        <EveilMusicalIcon
          className="ms-4 color_change"
          style={{ height: "27px", width: "31px" }}
        />
      ),
    },
    {
      label: "ÉVEIL MUSICAL",
      key: "8",
      icon: (
        <EveilIcon
          className="ms-4 color_change"
          style={{ height: "27px", width: "31px" }}
        />
      ),
    },
    {
      label: "GUITARES",
      key: "9",
      icon: (
        <GuitaresIcon
          className="ms-4 color_change"
          style={{ height: "27px", width: "31px" }}
        />
      ),
    },
    {
      label: "SONO HOME STUDIO",
      key: "10",
      icon: (
        <SonoHomeIcon
          className="ms-4 color_change"
          style={{ height: "27px", width: "31px" }}
        />
      ),
    },
    {
      label: "PERCUSSIONS",
      key: "11",
      icon: (
        <PercussionsIcon
          className="ms-4 color_change"
          style={{ height: "27px", width: "31px" }}
        />
      ),
    },
  ];

  const Menu = [
    {
      id: "menu-0",
      title: "TOUS NOS INSTRUMENTS",
      href: "/instruments",
      children: MENU_LIST,
    },
    {
      id: "menu-1",
      title: "1425 marques",
      href: "/marques",
    },
    {
      id: "menu-7",
      title: "promotions",
      href: "#",
      children: [
        {
          key: "promtion-1",
          label: "instruments",
          href: "/promotions/instruments",
        },
        {
          key: "promotion-8",
          label: "partitions",
          href: "/promotions/partitions",
        },
      ],
    },
    {
      id: "menu-2",
      title: "occasions",
      href: "/occasions",
    },
    {
      id: "menu-3",
      title: "partitions",
      href: "/partitions",
    },
    {
      id: "menu-4",
      title: "services",
      href: "/services",
      children: [
        {
          key: "services-1",
          label: "nos boutiques",
          href: "/boutique",
        },
        ...servicesMenu,
        {
          key: "services-8",
          label: "faq",
          href: "/faq",
        },
      ],
    },
    {
      id: "menu-5",
      title: "contact",
      href: "/contactez",
    },
  ];

  const getMenuList = async () => {
    const response = await getInstrumentsMenu();
    let arr = [];
    if (response?.data) {
      arr = response?.data?.map((item, index) => {
        let obj = {
          key: index,
          label: item?.group_name,
          icon: (
            <img
              style={{ height: "40px", width: "40px" }}
              src={item?.group_image}
            />
          ),
          href: `/instruments/${item?.group_slug}`,
        };
        if (item?.group_children) {
          obj.children = item?.group_children?.map((child, index) => {
            let category = {
              title: child?.category_name,
              href: `${obj.href}/${child?.category_slug}`,
              menu: child?.category_childern?.map((cate, index) => {
                return {
                  label: cate?.category_name,
                  href: `${obj.href}/${child?.category_slug}/${cate?.category_slug}`,
                };
              }),
            };
            return category;
          });
        }
        return obj;
      });
    }
    setInstrumentMenu(arr);
  };

  console.log(instrumentsMenu);

  useEffect(() => {
    getMenuList();
  }, []);

  const handleRedirection = (redirectText) => {
    router.push(`/${redirectText}`);
  };

  // const loader = () => {
  //   setIsLoading(true);
  // };

  return (
    <div className="header_top_container w-100">
      <div className="w-100 d-none d-md-flex header_container justify-content-between align-items-center px-1 px-md-3 px-lg-5">
        <div className="d-flex flex-row">
          <div className="pe-3 text_container text-light d-flex">
            <FaBoxOpen /> &nbsp;Frais de port offert dès 100
          </div>
          <div className="pe-3 text_container text-light">
            <img src="/assets/footerSvgs/footerTop/setting.svg" alt="logo" />
            &nbsp; {"Réparation et location d'instruments"}
          </div>
        </div>
        <div className="d-flex flex-row">
          <div className="pe-3 text_container text-light d-flex">
            <FaPhoneVolume />
            &nbsp;+33(1) 53 06 39 40
          </div>
          <div className="pe-3 text_container text-light ms-2 d-flex align-items-center">
            FR
            <IoIosArrowDown />
          </div>
        </div>
      </div>
      <div className="header__logo-top_container d-flex justify-content-between flex-column align-items-center px-1 px-md-3 px-lg-5">
        <div className="d-flex justify-content-between w-100 py-2">
          <div className="header__logo-top_left_container_logo d-flex justify-content-between align-items-center">
            <div className="burger_button me-2 py-2  px-3 d-inline-block d-md-none">
              <CgMenu className="middle_top_bar_icon text-light" />
              {/* <MobileNavigationDropdown menuList={Menu} /> */}
              {/* <MobileNavigationDrilldown menuList={MENU_LIST} /> */}
            </div>
            <img
              src="/assets/Arpeges_logo.png"
              alt="logo"
              height={60}
              width={230}
              onClick={() => router.push("/")}
              className="app__logo d-none d-md-block cursor-pointer"
            />
            <img
              src="/assets/Arpeges_logo_a.png"
              alt="logo"
              onClick={() => router.push("/")}
              className="app__logo d-inline-block d-md-none cursor-pointer"
            />
            <div className="d-none d-lg-flex align-items-center">
              <input
                name="input-content"
                className="header__logo-top_right_container-input_box"
                placeholder="Je cherche un instrument, une marque, un compositeur..."
              />
              <FaSearch
                onClick={() => router.push("/search")}
                className="header__logo-top_right_container-search_button"
              />
            </div>
          </div>

          <div className="header__logo-top_right_container-right-div d-flex justify-content-between flex-row align-items-center">
            <div className="d-flex justify-content-between flex-row align-items-center mx-2">
              <Link href={`${userData ? "/compte" : "/auth/login"}`} passHref>
                <a className="middle_top_bar_text text-light ">
                  {" "}
                  <BsPersonCircle size={24} className="middle_top_bar_icon" />
                </a>
              </Link>

              <div className="d-none d-xl-inline-block text-center ms-2">
                <Link href={`${userData ? "/compte" : "/auth/login"}`} passHref>
                  <a className="middle_top_bar_text text-light ">
                    {" "}
                    {userData ? userData?.name : "Me connecter"}
                  </a>
                </Link>
              </div>
            </div>
            <div className="d-flex  flex-row align-items-center mx-2">
           <Link href="/mes-envives" passHref>
           <a>
           <FaRegHeart
                size={24}
                className="middle_top_bar_icon text-light d-none d-sm-inline-block"
              />
              <FaHeart
                size={24}
                className="middle_top_bar_icon text-light d-inline-block d-sm-none"
              />
              <span className="middle_top_bar_text text-light d-none d-xl-inline-block text-center ms-2">
                Mes envies
              </span>
           </a>
           </Link>
            </div>
            <div className="d-flex  align-items-center ms-2">
              <Link
                href="/cart"
                passHref
                // onClick={loader}
                // disabled={isLoading}
              >
                <a className="text-light">
                  <BiShoppingBag size={24} className="middle_top_bar_icon" />
                </a>
              </Link>

              <span className="cart_qty_container d-flex justify-content-center align-items-center">
                {cartDetails?.items?.length || 0}
              </span>

              <div className="middle_top_bar_text d-none d-xl-inline-block text-light text-center">
                <Link
                  href="/cart"
                  passHref
                  // onClick={loader}
                  // disabled={isLoading}
                >
                  <a className="middle_top_bar_text text-light ">Mon panier</a>
                </Link>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-row align-items-center me-2 mt-1">
              <img
                src="/assets/flag_icon.svg"
                alt="logo"
                className="app__flag d-inline-block d-md-none"
              />
            </div>
          </div>
        </div>

        <div className="d-flex d-lg-none mb-3 align-items-center justify-content-center w-100 headerSearchWrap">
          <input
            name="input-content"
            className="header__logo-top_right_container-input_box"
            value=""
            placeholder="Je cherche un instrument, une marque, un compositeur..."
          />
          <FaSearch className="header__logo-top_right_container-search_button" />
        </div>
      </div>
      <div className="header__bottom d-none d-md-block">
        <div className="header__bottom-nav text-light px-5 ">
          {Menu.map((menu, index) => {
            return (
              <div
                key={menu.id}
                className={`instrument-menu ${
                  index == 0
                    ? " bg-light dynamic_blue   header__bottom-nav_white_box"
                    : ""
                } d-flex  flex-row align-items-center position-relative cursor-pointer`}
              >
                {index == 0 && (
                  <CgMenu
                    size={20}
                    className="dynamic_blue middle_top_bar_icon"
                  />
                )}
                <Link href={menu.href}>
                  <a
                    className={` ${
                      router.pathname == menu.href ? "active-menu" : ""
                    } text-uppercase px-1  nav-link  cursor-pointer text-decoration-none`}
                  >
                    {menu.title}
                  </a>
                </Link>
                {index != 0 && menu.children && <IoIosArrowDown />}
                {menu.children && (
                  <NavigationDropdown
                    menuList={index != 0 ? menu.children : instrumentsMenu}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
