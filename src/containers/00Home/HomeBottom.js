import React from 'react';
// import { withTranslation } from 'react-i18next';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as InviteeActionCreators from '../actions/invitee';

function HomeBottom({ t }) {
    return (
        <div className="wrapper-homeBottom">
            <div className="wrapper-HowItWork">
                <div className="HowItWork">
                    <h3>How it<div className="sep-0"></div> Works</h3>
                    <div>
                        <img src={require('../../images/m_homepage_how.jpg')} alt="" className="android" />
                    </div>
                </div>
            </div>

            <div className="wrapper-featured">
                <div className="featured align-center">
                    <div>
                        <img src={require('../../images/m_homepage_feature.jpg')} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeBottom;
