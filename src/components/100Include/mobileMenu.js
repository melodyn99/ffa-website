import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import {
	Accordion,
	AccordionItem,
	AccordionItemTitle,
	AccordionItemBody,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/minimal-example.css';

import * as HelperMobileHandle from '../../utils/00General/MobileHandle';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as AnimationsActionCreators from '../../actions/animations';

function MobileMenu(props) {
	const {t, i18n} = props;

	let handleMobileMenuReset = () => {
		HelperMobileHandle.MobileHandle.menuReset();
	}

	let logined = false;
	if (typeof (props.members.Login) !== "undefined" && props.members.Login !== null && props.members.Login.length !== 0)
		logined = true;
	
	return (
		<div className="wrapper-mobile-menu">
			<div className="mobile-menu">

				<Link to="/" className="logo">
					<img src={require('../../images/mobile/General/menu-and-footer/logo_letspark.png')} alt="" />
				</Link>

				<div className="sep-20"></div>

				<ul>
					<li>
						<Accordion>
							<AccordionItem>
								<AccordionItemTitle>
									<h3>{t("General.ForParkers")}</h3>
								</AccordionItemTitle>
								<AccordionItemBody>
									<Link to={"/" + i18n.language + "/"}
										onClick={handleMobileMenuReset}
									>{t("Menu.HowItWork")}</Link>
								</AccordionItemBody>
							</AccordionItem>
							<AccordionItem>
								<AccordionItemTitle>
									<h3>{t("General.ForOwners")}</h3>
								</AccordionItemTitle>
								<AccordionItemBody>
									<Link to={"/" + i18n.language + "/"}
										onClick={handleMobileMenuReset}
									>{t("Menu.HowItWork")}</Link>
								</AccordionItemBody>
							</AccordionItem>
						</Accordion>
					</li>

					{logined &&
						<li><Link to={"/" + i18n.language + "/"}>{t("General.MyAccount")}</Link></li>
					}
					{logined &&
						<li><Link to={"/" + i18n.language + "/memberLogout"}>{t("General.Logout")}</Link></li>
					}
					{!logined &&
						<li><Link to={"/" + i18n.language + "/memberCreateAccountStart"}>{t("General.Register")}</Link></li>
					}
					{!logined &&
						<li><Link to={"/" + i18n.language + "/memberGetStarted"}>{t("General.Login")}</Link></li>
					}
					{i18n.language === 'zh-HK' ?
						<li><Link to={"/en-US" + props.router.location.pathname.substring(6)} onClick={() => i18n.changeLanguage('en-US')}>Eng</Link></li>
						: <li><Link to={"/zh-HK" + props.router.location.pathname.substring(6)} onClick={() => i18n.changeLanguage('zh-HK')}>繁</Link></li>
					}
					<li><a href="https://enterprise.letspark.com.hk/" target="_blank" rel="noopener noreferrer">{t("Menu.LetsParkEnterprise")}</a></li>
				</ul >

				<div className="sep-30"></div>

				<div className="wrap">

					<ul className="free2">
						<li>
							<Link to={(logined ? "/" + i18n.language + "/stepOne" : "/" + i18n.language + "/memberLogin")}
								onClick={handleMobileMenuReset}
							><img src={require('../../images/mobile/01_homepage/icon_btn_list.png')} alt="" /></Link>
						</li>
					</ul>
				</div>

				<div className="sep-15"></div>
			</div >
		</div >
	);
}

const mapStateToProps = (state) => (
	{
		router: state.router,
		members: state.members
	}
);

export default withTranslation()(connect(mapStateToProps)(MobileMenu));
