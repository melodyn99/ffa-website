import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import {
  ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, List, Typography,
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { isFunction } from 'lodash-es';

import { apiStudents } from '../../Api/ApiStudents';
import { apiEventPpt } from '../../Api/ApiEventPpt';
import { apiSeatingPlan } from '../../Api/ApiSeatingPlan';
import StudentListItem from "./StudentListItem";
import { setPlan } from '../../Redux/Action/seatingPlanAction';
import { makeColorString } from "./Seat";

const styles = ({
  container: {
    padding: 10,
  },
  expansionPanel: {
    width: '100%',
    margin: 0,
    backgroundColor: 'unset',
    borderBottom: "1px solid rgb(224, 224, 224)",
    boxShadow: 'unset',
    '&:nthOfType(even)': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    '&:before': { backgroundColor: 'unset' },
  },
  panelTitle: {
    fontSize: '18px',
    marginLeft: '5px',
  },
  zeroPadding: {
    padding: '0px',
    width: '100%',
  },
  listItem: {
    padding: '0px',
    marginLeft: '40px',
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export const getColorBrand = (brands, brand) => {
  const found = brands.find(b => b.brand === brand);
  return found ? makeColorString(found) : "#fff";
};

const getRGBBrand = (brands, brand) => {
  const found = brands.find(b => b.brand === brand);
  return found ? { r: found.r, g: found.g, b: found.b } : null;
};

class SquareColor extends React.Component {
  styles = {
    square: {
      width: 24,
      height: 24,
      marginRight: 0,
      border: "1px solid black"
    },
    cover: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      cursor: "default"
    },
    box: {
      zIndex: 200,
      cursor: "default"
    }
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      picker: false,
      position: null
    };
  }

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();

    const { y } = e.target.getBoundingClientRect();
    this.setState({
      picker: !this.state.picker,
      position: y > 300 ? "top" : "bottom"
    });
  }

  render() {
    const { color } = this.props;

    const popover = {
      position: 'absolute',
      top: this.state.position === "bottom" ? 24 : undefined,
      bottom: this.state.position === "top" ? 28 : undefined,
      zIndex: '101',
    }

    return (
      <div style={{ position: "relative" }}>
        <div style={{ ...this.styles.square, backgroundColor: color }}
          onClick={this.onClick} />
        {this.state.picker &&
          <div style={popover}>
            <div style={this.styles.cover}
              onClick={this.onClick} />
            <div style={this.styles.box}
              onClick={(e) => e.stopPropagation()}>
              <ChromePicker disableAlpha
                color={color}
                onChangeComplete={this.props.onColorChanged} />
            </div>
          </div>
        }
      </div>
    );
  }
}

class StudentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async onColorChanged({ rgb }, company) {
    const { a, ...color } = rgb;
    const { companies, plan, viewingEvent } = this.props;

    const brands = companies.map(comp => ({
      brand: comp.brand,
      ...(comp.company_id === company.company_id
        ? color
        : this.state[comp.company_id] || getRGBBrand(plan.brands, comp.brand))
    }));

    await apiEventPpt.editEventPpt(viewingEvent.event_preparation_id, {
      ...viewingEvent,
      seating_plan_json: JSON.stringify(brands) // Why ? It's Weird
    });

    if (isFunction(this.props.onCompanyColorChanged)) {
      this.props.onCompanyColorChanged(rgb, company);
    }
    this.setState({ [company.company_id]: color });
  }

  render() {
    const { classes, companies, plan } = this.props;

    return (
      <div className={classes.container}>
        {
          plan && plan.brands && companies && companies.map(company => {
            const color = this.state[company.company_id]
              ? makeColorString(this.state[company.company_id])
              : getColorBrand(plan.brands, company.brand);

            return (
              <div key={company.company_id}>
                <ExpansionPanel className={classes.expansionPanel}>
                  <ExpansionPanelSummary expandIcon={<ChevronRight />}
                    style={{ paddingLeft: 0, height: 50, minHeight: 50 }} >
                    <SquareColor onColorChanged={(c) => this.onColorChanged(c, company)}
                      company={company}
                      color={color} />
                    <Typography className={classes.panelTitle}>
                      {`${company.brand} (${company.students.length})`}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.zeroPadding}>
                    <List className={classes.zeroPadding}>
                      {
                        company.students.map((student, index) => (
                          <StudentListItem key={student.student}
                            company={company}
                            plan={plan}
                            student={student}
                            color={color}
                            index={index} />
                        ))
                      }
                    </List>
                  </ExpansionPanelDetails>
                </ExpansionPanel>

              </div>
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  plan: state.seatingPlanReducer.plan,
  viewingEvent: state.eventReducer.viewingEvent
});

const mapDispatchToProps = dispatch => ({
  setPlan: (plan) => dispatch(setPlan(plan))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(StudentContainer));
