import React from 'react';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

function Footer(props) {
	// const { t, i18n } = props;

	return (
		<div className="wrapper-footer">
			<div className="footer">
				Footer
			</div>
		</div >
	);
}

export default withTranslation()(Footer);
