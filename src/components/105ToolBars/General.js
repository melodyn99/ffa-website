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

class General extends Component {

    render() {
        const { //t, i18n 
            classes } = this.props;

        // let pathname = this.props.route.location.pathname,
        //     urlArray = pathname.split("/"),
        //     currentPath = urlArray[2];

        // console.log(currentPath);

        return (
            <div className="toolBar">
                {this.props.backButton &&
                    <Button
                        className={classes.createButton}
                        onClick={() => this.props.history.go(-1)}
                    >{this.props.backButtonText}</Button>
                }

                {this.props.createButton &&
                    <Button
                        className={classes.createButton}
                        onClick={() => this.props.history.push(this.props.createButtonUrl)}
                    >{this.props.createButtonText}</Button>
                }

                {this.props.editButton &&
                    <Button
                        className={classes.editButton}
                    // onClick={() => this.props.history.push(this.props.editButtonUrl)}
                    >{this.props.editButtonText}</Button>
                }

                {this.props.deleteButton &&
                    <Button
                        className={classes.editButton}
                    >{this.props.deleteButtonText}</Button>
                }

                {this.props.importButton &&
                    <Button
                        className={classes.editButton}
                    >{this.props.importButtonText}</Button>
                }

                {this.props.copyButton &&
                    <Button
                        className={classes.editButton}
                    >{this.props.copyButtonText}</Button>
                }

                {this.props.reportButton &&
                    <Button
                        className={classes.editButton}
                    >{this.props.reportButtonText}</Button>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps)(withStyles(combinedStyles)(withRouter(General))));
