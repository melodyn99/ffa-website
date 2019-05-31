// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/common'
import { SeatingPlanStyles } from '../../utils/01MaterialJsStyles/SeatingPlan'
import combineStyles from '../../utils/01MaterialJsStyles/combineStyles';
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
import SeatPlanView from './SeatPlanView';
import SeatingPlanPanel from "./SeatingPlanPanel";

class SeatingPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: null
        };
        this.handleCompanyColorChanged = this.handleCompanyColorChanged.bind(this);
    }

    componentDidMount() {
        const { viewingSeminar, viewingEvent, setEditPlanType, setPlan } = this.props;
        return Promise.all([
            apiSeatingPlan.seatingPlanDetail(viewingEvent.event_preparation_id),
            apiStudents.getConferenceStudent(viewingSeminar.conference_id)
        ]).then(results => {
            const [plan, companies] = results;
            setEditPlanType(plan.seating_plan_type);
            setPlan(plan);
            this.setState({ companies });
        }).catch(console.error);
    }

    handleCompanyColorChanged(rgb, company) {
        const { viewingEvent, setEditPlanType, setPlan } = this.props;
        return apiSeatingPlan.seatingPlanDetail(viewingEvent.event_preparation_id).then(plan => {
            setEditPlanType(plan.seating_plan_type);
            setPlan(plan);
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.viewingEvent !== this.props.viewingEvent ||
            nextProps.viewingSeminar !== this.props.viewingSeminar ||
            this.state !== nextState;
    }

    render() {
        const { classes, viewingEvent, plan } = this.props;
        const { companies } = this.state;

        // return companies && plan && 
        return (
            <div>
                {/* <SeatingPlanPanel companies={companies}
                    viewingEvent={viewingEvent}
                    onCompanyColorChanged={this.handleCompanyColorChanged}
                />
                <SeatPlanView companies={companies}
                    plan={plan} /> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    viewingEvent: state.eventReducer.viewingEvent,
    viewingSeminar: state.seminarReducer.viewingSeminar,
    plan: state.seatingPlanReducer.plan,
});

const mapDispatchToProps = dispatch => ({
    setPlan: (plan) => dispatch(setPlan(plan)),
    setEditPlanType: (type) => dispatch(setEditPlanType(type))
});

const combinedStyles = combineStyles(CommonStyles, SeatingPlanStyles);

export default withTranslation()(autoScrollTop(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(SeatingPlan))));

