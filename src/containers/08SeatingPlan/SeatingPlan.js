// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/00Common/common'
import { SeatingPlanStyles } from '../../utils/01MaterialJsStyles/08SeatingPlan/SeatingPlan'
import combineStyles from '../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';

// Api
import { apiSeatingPlan } from '../../Api/ApiSeatingPlan';
import { apiStudents } from '../../Api/ApiStudents';

// Redux
import { connect } from 'react-redux';
import { setPlan, setEditPlanType } from '../../Redux/Action/seatingPlanAction';

// Utils
import { autoScrollTop } from '../../Util/ScrollToTop';

// Children components
import BreadCrumb from '../../components/100Include/breadcrumb';
import SeatingPlanPanel from "./SeatingPlanPanel";
import SeatPlanView from './SeatPlanView';

class SeatingPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: null
        };
        this.handleCompanyColorChanged = this.handleCompanyColorChanged.bind(this);
    }

    componentDidMount() {
        // const { viewingSeminar, viewingEvent } = this.props;

        // this._apiSeatingPlanDetail(viewingEvent.event_preparation_id);
        this._apiSeatingPlanDetail('3e5529cc-b096-428a-90b2-2a3eb520927b');

        // this._apiGetConferenceStudent(viewingSeminar.conference_id);
        this._apiGetConferenceStudent('5dd2c9b5-8898-4dd8-b44e-003917ce5815');
    }

    _apiSeatingPlanDetail = (id) => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            this.props.setEditPlanType(obj.body.seating_plan_type);
            this.props.setPlan(obj.body);
        }
        const eCb = (obj) => { console.log("eCb : ", obj) }
        const params = null;
        apiSeatingPlan.seatingPlanDetail(id, params, this.props.auth.token, cb, eCb);
    }

    _apiGetConferenceStudent = (id) => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            this.setState({
                ...this.state,
                companies: obj.body
            });
        }
        const eCb = (obj) => { console.log("eCb : ", obj) }
        const params = null;
        apiStudents.getConferenceStudent(id, params, this.props.auth.token, cb, eCb);
    }

    handleCompanyColorChanged(rgb, company) {
        const { viewingEvent } = this.props;
        this._apiSeatingPlanDetail = (viewingEvent.event_preparation_id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.viewingEvent !== this.props.viewingEvent ||
            nextProps.viewingSeminar !== this.props.viewingSeminar ||
            this.state !== nextState;
    }

    render() {
        const { viewingEvent, plan, classes } = this.props;
        const { companies } = this.state;

        // return companies && plan && 
        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">報名歷史</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <div className={classes.rootSeatingPlan}>
                                    <SeatingPlanPanel
                                        companies={companies}
                                        viewingEvent={viewingEvent}
                                        onCompanyColorChanged={this.handleCompanyColorChanged}
                                    />
                                    <SeatPlanView companies={companies}
                                        plan={plan} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    viewingEvent: state.eventReducer.viewingEvent,
    viewingSeminar: state.seminarReducer.viewingSeminar,
    plan: state.seatingPlanReducer.plan,
});

const mapDispatchToProps = dispatch => ({
    setPlan: (data) => { dispatch(setPlan(data)) },
    setEditPlanType: (data) => { dispatch(setEditPlanType(data)) }
});

const combinedStyles = combineStyles(CommonStyles, SeatingPlanStyles);

export default withTranslation()(autoScrollTop(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(SeatingPlan))));

