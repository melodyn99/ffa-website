import React from 'react';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

function ErrorMessage(props) {
	// const { t, i18n } = props;

	return (
		<span className="errorMessage">
			{props.message}
		</span>
	);
}

export default withTranslation()(ErrorMessage);
