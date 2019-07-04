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

//Util
import FileInput from '../../Util/FileInput';
import { emitter, EventTypes } from '../../Util/EventEmitter';

class General extends Component {

    // updateFile(pathname, data) {
    //     if (pathname === '/itinerarymgt') {
    //         return emitter.emit(EventTypes.ADD_FILE_TO_ITINERAEY_MGT, data);
    //     }
    //     if (pathname === '/eventdetails') {
    //         return emitter.emit(EventTypes.ADD_FILE_TO_EVENT, data);
    //     }

    //     if (pathname === '/checkindetail') {
    //         return emitter.emit(EventTypes.ADD_FILE_TO_CHECKIN, data);
    //     }
    //     if (pathname === '/newnotecontent') {
    //         return emitter.emit(EventTypes.ADD_FILE_TO_NOTE, data);
    //     }
    //     if (pathname === '/notecontent') {
    //         return emitter.emit(EventTypes.ADD_FILE_TO_NOTE, data);
    //     }
    //     if (pathname === '/companydetail') {
    //         return emitter.emit(EventTypes.ADD_CSV_FILE, data);
    //     }

    //     return emitter.emit(EventTypes.ADD_FILE_TO_LIBRARY, data);
    // }

    customHeaderButtonCallback(eventName, data) {
        emitter.emit(eventName, data);
    }

    render() {
        const { //t, i18n 
            classes } = this.props;

        // let pathname = this.props.route.location.pathname,
        //     urlArray = pathname.split("/"),
        //     currentPath = urlArray[2];

        // console.log(currentPath);

        return (
            <div className={"toolBar" + (this.props.noMargin ? ' noMargin' : '')}>
                {this.props.backButton &&
                    <Button
                        className={classes.greyButton}
                        onClick={() => this.props.backButtonAction(this.props.backButtonActionUrl)}
                    >{this.props.backButtonText}</Button>
                }

                {this.props.createButton &&
                    <Button
                        className={classes.blueGreenButton}
                        onClick={() => this.props.createButtonAction(this.props.createButtonActionUrl)}
                    >{this.props.createButtonText}</Button>
                }

                {this.props.editButton &&
                    <Button
                        className={classes.greyButton}
                        onClick={() => this.props.editButtonAction()}
                    >{this.props.editButtonText}</Button>
                }

                {this.props.uploadButton &&
                    <Button
                        className={classes.blueGreenButton}
                        onClick={() => this.customHeaderButtonCallback(EventTypes.OPEN_FILE_BROWSER)}>
                        <FileInput onSelected={(file) => {
                            this.props.uploadButtonAction(file);
                        }}
                        />
                        {this.props.uploadButtonText}
                    </Button>
                }

                {this.props.downloadButton &&
                    <Button
                        className={classes.greyButton}
                        onClick={() => this.props.downloadButtonAction()}
                    >{this.props.downloadButtonText}</Button>
                }

                {this.props.deleteButton &&
                    <Button
                        className={classes.greyButton}
                        onClick={() => this.props.deleteButtonAction()}
                    >{this.props.deleteButtonText}</Button>
                }

                {this.props.importButton &&
                    <Button
                        className={classes.greyButton}
                        onClick={() => this.props.importButtonAction()}
                    >{this.props.importButtonText}</Button>
                }

                {this.props.copyButton &&
                    <Button
                        className={classes.blueButton}
                        onClick={() => this.props.copyButtonAction()}
                    >{this.props.copyButtonText}</Button>
                }

                {this.props.reportButton &&
                    <Button
                        className={classes.greenButton}
                        onClick={() => this.props.reportButtonAction()}
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
