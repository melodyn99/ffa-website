import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import {
	Accordion,
	AccordionItem,
	AccordionItemTitle,
	AccordionItemBody,
} from 'react-accessible-accordion';

function Footer(props) {
	const { t, i18n } = props;

	let debug = false;

	return (
		<div className="wrapper-footer">
			<div className="footer">
				<div className="inner clearfix">
					<div className="right-part right clearfix">
						<div className="enews-subscription">
							<h3>Enews subscription</h3>
							<input type="text" placeholder="Name" />
							<input type="text" placeholder="Email" />
							<div className="sep-0"></div>
							<input type="submit" className="button right" value="Submit" />
						</div>
					</div>

					<div className="left-part desktop left clearfix">
						<div className="forty left">
							<ul>
								<li><h3>Let's Park</h3></li>
								<li><Link to={"/" + i18n.language + "/discover"}>{t("Menu.Discover")}</Link></li>
								<li><Link to={"/" + i18n.language + "/media"}>{t("Menu.MediaCoverage")}</Link></li>
								<li><Link to={"/" + i18n.language + "/helpCenter"}>{t("Menu.HelpCentre")}</Link></li>
								<li><Link to={"/" + i18n.language + "/contact"}>{t("Menu.ContactUs")}</Link></li>
								<br /><br />

								{debug ?
									<div>
										<li></li>
										<li><Link to={"/" + i18n.language + "/hotSpaces"}> HotSpaces</Link></li>
										<br /><br />

										<li><Link to={"/" + i18n.language + "/memberGetStarted"} className="color-orange">MemberGetStarted</Link></li>
										<li><Link to={"/" + i18n.language + "/memberLogin"} className="color-orange">MemberLogin</Link></li>
										<li><Link to={"/" + i18n.language + "/memberCreateAccountStart"} className="color-orange">MemberCreateAccountStart</Link></li>
										<li><Link to={"/" + i18n.language + "/memberCreateAccount"} className="color-orange">MemberCreateAccount</Link></li>
										<li><Link to={"/" + i18n.language + "/memberCreateAccountComplete"} className="color-orange">MemberCreateAccountComplete</Link></li>
										<li><Link to={"/" + i18n.language + "/memberMobileVerification"} className="color-orange">MemberMobileVerification</Link></li>
										<br /><br />
										<li><Link to={"/" + i18n.language + "/memberBookings"} > MemberBookings</Link></li>
										<li><Link to={"/" + i18n.language + "/memberListedSpaces"} > MemberListedSpaces</Link></li>
										<li><Link to={"/" + i18n.language + "/memberHistory"} > MemberHistory</Link></li>
										<li><Link to={"/" + i18n.language + "/memberProfile"} > MemberProfile</Link></li>
										<li><Link to={"/" + i18n.language + "/memberCredit"} > MemberCredit</Link></li>
										<li><Link to={"/" + i18n.language + "/memberSettings"} > MemberSettings</Link></li>

										<br /><br />

										<li><Link to={"/" + i18n.language + "/stepOne"} className="color-red">Step 1</Link></li>
										<li><Link to={"/" + i18n.language + "/stepTwo"} className="color-red">Step 2 (FormHourly)</Link></li>
										<li><Link to={"/" + i18n.language + "/stepThree"} className="color-red">Step 3</Link></li>
										{/* <li><Link to="/" + i18n.language + "/preview" className="color-red">Step 4</Link></li> */}
										<li><Link to={"/" + i18n.language + "/listASpaceConfirm"}>List A Space Confirm</Link></li>
										<br /><br />

										<li><Link to={"/" + i18n.language + "/spaceMap"}>SpaceMap</Link></li>
										<li><Link to={"/" + i18n.language + "/findYourSpace"} className="color-green">FindYourSpace</Link></li>
										<li><Link to={"/" + i18n.language + "/spaceOne"} className="color-green">SpaceOne</Link></li>
										<li><Link to={"/" + i18n.language + "/spaceTwo"} className="color-green">SpaceTwo</Link></li>
										<li><Link to={"/" + i18n.language + "/spaceThree"} className="color-green">SpaceThree</Link></li>
										<li><Link to={"/" + i18n.language + "/detailMonthly"} className="color-green">DetailMonthly</Link></li>
										<li><Link to={"/" + i18n.language + "/detailHourly"} className="color-green">DetailHourly</Link></li>
										<li><Link to={"/" + i18n.language + "/detailTimeshare"} className="color-green">DetailTimeshare</Link></li>
										<li><Link to={"/" + i18n.language + "/payment"} className="color-green">Payment</Link></li>
										<li><Link to={"/" + i18n.language + "/landlordProfile"}>LandlordProfile</Link></li>
										<li><Link to={"/" + i18n.language + "/findYourSpaceConfirm"}>Find Your Space Confirm</Link></li>
										<br /><br />

										<li><Link to={"/" + i18n.language + "/messenger"}>Messenger</Link></li>
										<li><Link to={"/" + i18n.language + "/messages"}>Messages</Link></li>
										<br /><br />

										<li><Link to={"/" + i18n.language + "/contact"}>Contact</Link></li>
										<li><Link to={"/" + i18n.language + "/media"}>Media</Link></li>
										<br /><br />

										<li><Link to={"/" + i18n.language + "/results"}>Application Results</Link></li>
									</div>
									: ''}
							</ul>
						</div>
						<div className="sixty left">
							<ul>
								<li><h3>{t("General.Others")}</h3></li>
								<li><Link to={"/" + i18n.language + "/terms"}>{t("Menu.TermsAndConditions")}</Link></li>
								<li><Link to={"/" + i18n.language + "/cancellation"}>{t("Menu.CancellationPolicy")}</Link></li>
								<li><Link to={"/" + i18n.language + "/privacy"}>{t("Menu.PrivacyPolicy")}</Link></li>
								<li><Link to={"/" + i18n.language + "/disclaimer"}>{t("Menu.Disclaimer")}</Link></li>
							</ul>
						</div>

						<div className="sep-0"></div>

						<div className="full left bottom">
							<div className="copy-right">
								<span>&copy; {t("General.AllRightsReserved")}</span>
							</div>

							<div className="footer-app">
								<span>{t("General.NowAvailableAt")}</span>
								<img src={require('../../images/mobile/General/menu-and-footer/btn_appstore.png')} alt="" className="ios" />
								<img src={require('../../images/mobile/General/menu-and-footer/btn_googleplay.png')} alt="" className="android" />
							</div>
						</div>
					</div>

					<div className="left-part mobile left clearfix">
						<Accordion>
							<AccordionItem>
								<AccordionItemTitle>
									<h3>Let's Park</h3>
								</AccordionItemTitle>
								<AccordionItemBody>
									<Link to={"/" + i18n.language + "/discover"}>{t("Menu.Discover")}</Link>
									<Link to={"/" + i18n.language + "/media"}>{t("Menu.MediaCoverage")}</Link>
									<Link to={"/" + i18n.language + "/helpCenter"}>{t("Menu.HelpCenter")}</Link>
									<Link to={"/" + i18n.language + "/contact"}>{t("Menu.ContactUs")}</Link>
								</AccordionItemBody>
							</AccordionItem>

							<AccordionItem>
								<AccordionItemTitle>
									<h3>{t("General.Others")}</h3>
								</AccordionItemTitle>
								<AccordionItemBody>
									<Link to={"/" + i18n.language + "/terms"}>{t("Menu.TermsAndConditions")}</Link>
									<Link to={"/" + i18n.language + "/cancellation"}>{t("Menu.CancellationPolicy")}</Link>
									<Link to={"/" + i18n.language + "/privacy"}>{t("Menu.PrivacyPolicy")}</Link>
									<Link to={"/" + i18n.language + "/disclaimer"}>{t("Menu.Disclaimer")}</Link>
								</AccordionItemBody>
							</AccordionItem>
						</Accordion>

						<div className="sep-20"></div>
						<div className="sep-20"></div>

						<div className="copy-right">
							<span>&copy; 2019 Wilson Parking. All rights reserved.</span>
						</div>
					</div>
				</div>
			</div>
		</div >
	);
}

export default withTranslation()(Footer);
