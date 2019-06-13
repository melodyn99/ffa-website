import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// import {
// 	Accordion,
// 	AccordionItem,
// 	AccordionItemTitle,
// 	AccordionItemBody,
// } from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/minimal-example.css';

// import * as HelperMobileHandle from '../../utils/00JqueryControl/MobileHandle';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as AnimationsActionCreators from '../../actions/animations';

function MobileMenu(props) {
	const { //t, 
		i18n } = props;

	// let handleMobileMenuReset = () => {
	// 	HelperMobileHandle.MobileHandle.menuReset();
	// }

	// let logined = false;
	// if (typeof (props.auth.auth) !== "undefined" && props.auth.auth !== null && props.auth.auth.length !== 0)
	// 	logined = true;

	return (
		<div className="wrapper-mobile-menu">
			<div className="mobile-menu">

				<Link to="/" className="logo">
					LOGO
				</Link>

				<div className="sep-20"></div>

				<ul>
					<li><Link to={"/" + i18n.language + "/courses-management"}>课程管理</Link></li>
					<li><Link to={"/" + i18n.language + "/students-management"} className="active">学生管理</Link></li>
					<li><Link to={"/" + i18n.language + "/enrollment-management"}>报名管理</Link></li>
					<li><Link to={"/" + i18n.language + "/news-management"}>新闻管理</Link></li>
					<li><Link to={"/" + i18n.language + "/activities-management"}>活动管理</Link></li>
					<li><Link to={"/" + i18n.language + "/resources-management"}>资源管理</Link></li>
					<li><Link to={"/" + i18n.language + "/my-alerts"}>我的提醒 (3)</Link></li>
					<li><Link to={"/" + i18n.language + "/reports"}>项目报告</Link></li>
				</ul>

				<div className="sep-30"></div>

				<div className="sep-15"></div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => (
	{
		router: state.router,
		auth: state.auth
	}
);

export default withTranslation()(connect(mapStateToProps)(MobileMenu));
