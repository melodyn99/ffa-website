// Essential for all components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Redux
import { connect } from 'react-redux';

class Preparation extends Component {

    render() {
        const { //t, 
            i18n } = this.props;

        // let pathname = this.props.route.location.pathname,
        //     urlArray = pathname.split("/"),
        //     currentPath = urlArray[2];

        // console.log(currentPath);

        return (
            <div className="subMenu">
                <ul className="clearfix">
                    <li><Link to={"/" + i18n.language + "/"}>个人资料</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>上载文件</Link></li>
                    <li><Link to={"/" + i18n.language + "/"} className="active">问卷调查</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>缴付费用</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>参加面试</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>取录通知</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>成功取录</Link></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(Preparation));
