// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/00Common/common'
import { SeatingPlanViewStyles } from '../../utils/01MaterialJsStyles/08SeatingPlan/SeatingPlanView'
import combineStyles from '../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Radio, FormControlLabel, RadioGroup, Button } from '@material-ui/core';

// Redux
import { connect } from 'react-redux';

// Children components
import SeatBoard from "./SeatBoard";

const BarTop = ({ plan, view, onViewChange }) => {
    const name = plan ? plan.seating_plan_type.name : "Plan";
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ textAlign: "center", margin: "0px 20px" }}>
                {name}
                <Button style={{ marginLeft: 10 }}
                    component={Link}
                    to="/editseatingplan">
                    编辑座位表参数
                </Button>
            </div>
            <RadioGroup style={{ display: "flex", flexDirection: "row" }}
                onChange={(e) => onViewChange(e.target.value)}
                value={view}>
                <FormControlLabel value="top" control={<Radio />} label="前视图" />
                <FormControlLabel value="bottom" control={<Radio />} label="后视图" />
            </RadioGroup>
        </div>
    );
}

const isPlanExisting = (plan) => {
    return plan &&
        plan.seating_plan_type &&
        plan.seating_plan_type.seating_plan_type_id !== undefined
};

const SelectPlanView = (props) => {
    return (
        <div style={{ display: "grid", width: "100%", height: "100%" }}>
            <div style={{ margin: "auto", color: "#696969" }}>
                请选择座位表类型
            </div>
        </div>
    );
};

class SeatBoardView extends React.Component {
    constructor(props) {
        super(props);
        this.onViewChange = this.onViewChange.bind(this);
        this.state = {
            view: "top"
        };
    }

    onViewChange(view) {
        this.setState({ view });
    }

    render() {
        const { classes, plan, companies } = this.props;
        const { view } = this.state;

        return !isPlanExisting(plan)
            ? <SelectPlanView />
            : (
                <div className={classes.rootSeatingPlanView}>
                    <BarTop plan={plan}
                        view={view}
                        onViewChange={this.onViewChange} />
                    <SeatBoard plan={plan}
                        companies={companies}
                        view={view} />
                </div>
            );
    }
}

const combinedStyles = combineStyles(CommonStyles, SeatingPlanViewStyles);

export default withTranslation()(connect(null, null)(withStyles(combinedStyles)(SeatBoardView)));
