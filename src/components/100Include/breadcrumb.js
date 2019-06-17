// Essential for all components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Redux
import { connect } from 'react-redux';

class Breadcrumb extends Component {

    renderSwitch = (currentPath) => {

        console.log('hello', currentPath);

        switch (currentPath) {

            case 'enrollment-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">報名歷史</Link></span> > <span>報名</span></div>);
            }

            case 'my-alerts': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">報名歷史</Link></span> > <span>報名123</span></div>);
            }

            default: {
                return (<div><span> <Link to="/">主頁</Link></span></div>);
            }
        }
    }

    render() {
        // const { t, i18n } = props;

        // console.log('hi', this.props.route.location.pathname);

        let pathname = this.props.route.location.pathname,
            urlArray = pathname.split("/"),
            currentPath = urlArray[2];

        // console.log(currentPath);

        return (
            <div className="breadcrumb">
                {this.renderSwitch(currentPath)}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(Breadcrumb));
