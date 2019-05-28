import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

function Breadcrumb(props) {
    // const { t, i18n } = props;

    return (
        <div className="breadcrumb">
            <span><Link to="/">主頁</Link></span> / <span><Link to="/">報名歷史</Link></span> > <span>報名</span>
        </div>
    );
}

export default withTranslation()(Breadcrumb);
