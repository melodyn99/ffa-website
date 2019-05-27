import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import * as AnimationsActionCreators from '../../actions/animations';

class Header extends Component {

    changeLanguage = (param) => {
        switch (param) {
            case 'zh-HK':
                param = 'zh-HK';
                break;
            case 'en-US':
                param = 'en-US';
                break;
            default:
                param = 'zh-HK';
        }
        this.props.i18n.changeLanguage(param);
    }

    render() {
        const { t, i18n } = this.props;

        let logined = false;
        if (typeof (this.props.members.Login) !== "undefined" && this.props.members.Login !== null && this.props.members.Login.length !== 0)
            logined = true;

        return (
            <div className="wrapper-header">
                <div className="header">
                    <div className="rest">
                        <div>
                            <span className="mobile-menu-btn"></span>

                            <Link to="/" className="logo">
                                <img src={require('../../images/mobile/General/menu-and-footer/logo_letspark.png')}
                                    alt="" />
                            </Link>
                        </div>
                        <div>
                            <ul className="header-options clearfix">
                                {logined &&
                                    <li><Link
                                        to={"/" + i18n.language + "/memberProfile"}>{t("General.MyAccount")}</Link>
                                    </li>
                                }
                                {logined &&
                                    <li><Link
                                        to={"/" + i18n.language + "/memberLogout"}>{t("General.Logout")}</Link>
                                    </li>
                                }
                                {!logined &&
                                    <li><Link
                                        to={"/" + i18n.language + "/memberGetStarted"}>{t("General.Login")}</Link>
                                    </li>
                                }
                                {!logined &&
                                    <li><Link
                                        to={"/" + i18n.language + "/memberCreateAccountStart"}>{t("General.Register")}</Link>
                                    </li>
                                }
                                {i18n.language === 'zh-HK' ?
                                    <li><Link to={"/en-US" + this.props.router.location.pathname.substring(6)}
                                        onClick={() => this.changeLanguage('en-US')}>Eng</Link></li>
                                    : <li><Link to={"/zh-HK" + this.props.router.location.pathname.substring(6)}
                                        onClick={() => this.changeLanguage('zh-HK')}>繁</Link></li>
                                }

                            </ul>

                            <Link
                                to={logined ? "/" + i18n.language + "/messenger" : "/" + i18n.language + "/memberLogin"}
                                className="bubble">
                                <span className="number">0</span>
                            </Link>

                            <ul className="free">
                                <li>
                                    <Link
                                        to={logined ? "/" + i18n.language + "/stepOne" : "/" + i18n.language + "/stepOne"}><img
                                            src={require('../../images/mobile/01_homepage/icon_btn_list.png')}
                                            alt="" /></Link>
                                </li>
                            </ul>

                            <span className="desktop-menu-btn"></span>
                        </div>
                    </div>

                    <div className="sep-0"></div>

                    <div className="wrapper-move">
                        <div className="move clearfix">
                            <div className="forty left">
                                <div className="clearfix">
                                    <ul>
                                        <li><h3>{t("General.ForParkers")}</h3></li>
                                        <li><Link to={"/" + i18n.language + "/helpCenter?session=parkers"}>{t("Menu.HowItWork")}</Link></li>
                                    </ul>
                                    <ul>
                                        <li><h3>{t("General.ForOwners")}</h3></li>
                                        <li><Link to={"/" + i18n.language + "/helpCenter?session=owners"}>{t("Menu.HowItWork")}</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="sixty left">
                                <div className="clearfix">
                                    <ul>
                                        <li className="spacer"><h3>&nbsp;</h3></li>
                                        {logined &&
                                            <li><Link
                                                to={"/" + i18n.language + "/memberProfile"}>{t("General.MyAccount")}</Link>
                                            </li>
                                        }
                                        {logined &&
                                            <li><Link
                                                to={"/" + i18n.language + "/memberLogout"}>{t("General.Logout")}</Link>
                                            </li>
                                        }
                                        {!logined &&
                                            <li><Link
                                                to={"/" + i18n.language + "/memberGetStarted"}>{t("General.Login")}</Link>
                                            </li>
                                        }
                                        {!logined &&
                                            <li><Link
                                                to={"/" + i18n.language + "/memberCreateAccountStart"}>{t("General.Register")}</Link>
                                            </li>
                                        }
                                    </ul>
                                    <ul>
                                        <li className="spacer"><h3>&nbsp;</h3></li>
                                        <li><a href="https://enterprise.letspark.com.hk/" target="_blank"
                                            rel="noopener noreferrer">{t("Menu.LetsParkEnterprise")}</a>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li><h3>&nbsp;</h3></li>
                                        <li>
                                            <Link to="/" className="align-center"><img
                                                src={require('../../images/mobile/01_homepage/icon_btn_list.png')}
                                                alt="" className="free3" /></Link>
                                        </li>
                                        {i18n.language === 'zh-HK' ?
                                            <li><Link to={"/en-US" + this.props.router.location.pathname.substring(6)}
                                                onClick={() => this.changeLanguage('en-US')}
                                                className="align-center">Eng</Link></li>
                                            : <li><Link to={"/zh-HK" + this.props.router.location.pathname.substring(6)}
                                                onClick={() => this.changeLanguage('zh-HK')}
                                                className="align-center">繁</Link></li>
                                        }
                                    </ul>
                                    <ul>
                                        <li className="align-center"><h3>Download our app</h3></li>
                                        <li>
                                            <Link to="/" className="align-center"><img
                                                src={require('../../images/mobile/General/menu-and-footer/btn_appstore.png')}
                                                alt="" className="ios" /></Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="align-center"><img
                                                src={require('../../images/mobile/General/menu-and-footer/btn_googleplay.png')}
                                                alt="" className="android" /></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        members: state.members,
        router: state.router
    }
);

export default withTranslation()(connect(mapStateToProps)(Header));
