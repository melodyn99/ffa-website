import React from 'react';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

function Footer(props) {
	// const { t, i18n } = props;

	return (
		<div className="wrapper-footer">
			<div className="bottom">
				<ul class="clearfix">
					<li>
						<a href="abhcd">联系我们</a>
					</li>
					<li>
						<a href="abcd">隐私政策</a>
					</li>
					<li>
						<a href="abcd">版权和免责声明</a>
					</li>
				</ul>
				</div>
			<div className="copyright">
				© 2019 Fablead学院。版权所有。
			</div>
			</div>
	);
}

export default withTranslation()(Footer);
