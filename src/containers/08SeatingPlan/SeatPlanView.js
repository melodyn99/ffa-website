import React from 'react';
import { Link } from 'react-router-dom';
import {
  Radio, FormControlLabel, RadioGroup, Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import SeatBoard from "./SeatBoard";

const BarTop = ({ plan, view, onViewChange }) => {
  const name = plan && plan.seating_plan_type.name || "Plan";
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

const styles = theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: "auto",
    overflow: "auto",
    [theme.breakpoints.down('xs')]: {
      display: 'none !important',
    },
  },
});

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
           <div className={classes.root}>
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

export default withStyles(styles)(SeatBoardView);
