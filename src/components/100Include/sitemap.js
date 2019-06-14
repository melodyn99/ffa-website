import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

function Sitemap(props) {
    const { t,
        i18n } = props;

    return (
        <div className="wrapper-sitemap">
            <div className="sitemap">
                <Link to={'/' + i18n.language + '/related-courses'}>Related Courses</Link>
            </div>
        </div >
    );
}

export default withTranslation()(Sitemap);