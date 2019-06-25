// Essential for all components
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// Redux
import { connect } from 'react-redux';

class HomePageTopBar extends Component {

    render() {
        const {
            // t, i18n, 
            classes
        } = this.props;

        return (
            <div className="wrapper-topbar">
                <div className="topbar">
                    <div className="schoolSelector">
                        <div className="one">请选择一个地区</div>
                        <div className="two">
                            <select>
                                <option value="1">杭州</option>
                                <option value="2">杭州</option>
                                <option value="3">杭州</option>
                            </select>
                        </div>
                        <div className="three">
                            <Button type="submit" className={classes.greyButton}>继续</Button>
                        </div>

                    </div>
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

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps)(withStyles(combinedStyles)(withRouter(HomePageTopBar))));
