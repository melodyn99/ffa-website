import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as AnimationsActionCreators from '../../actions/animations';

class Header extends Component {

    changeLanguage = (param) => {
        switch (param) {
            case 'zh-HK':
                param = 'zh-HK';
                break;
            case 'en-US':
                param = 'en-US';
                break;
            default:
                param = 'zh-HK';
        }
        this.props.i18n.changeLanguage(param);
    }

    render() {
        // const { t, i18n } = this.props;

        return (
            <div className="wrapper-header">
                <div className="header">
                    <div className="mobile-menu-btn">MENU</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        members: state.auth,
        router: state.router
    }
);

export default withTranslation()(connect(mapStateToProps)(Header));
