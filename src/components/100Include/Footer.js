import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

function Footer(props) {
	const { i18n } = props;

	return (
		<div className="wrapper-footer">
			<div className="footer">
				<ul className="clearfix">
					<li>
						<Link to={"/" + i18n.language + "/contact-us"}>联系我们</Link>
					</li>
					<li>
						<Link to={"/" + i18n.language + "/privacy-policy"}>隐私政策</Link>
					</li>
					<li>
						<Link to={"/" + i18n.language + "/copyright"}>版权和免责声明</Link>
					</li>
				</ul>
				<div className="copyright">
					<span>&copy; 2019 Fablead学院。&nbsp;&nbsp;版权所有。</span>
				</div>
			</div>
		</div>
	);
}

export default withTranslation()(Footer);
