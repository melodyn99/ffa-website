// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/00Common/common'
import { SeatingPlanPanelStyles } from '../../utils/01MaterialJsStyles/08SeatingPlan/SeatingPlanPanel'
import combineStyles from '../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

// Api
import { apiSeatingPlan } from '../../Api/ApiSeatingPlan';
// import { apiStudents } from '../../Api/ApiStudents';

// Redux
import { connect } from 'react-redux';
import { setPlan } from '../../Redux/Action/seatingPlanAction';

// Utils
import { cloneDeep, flatMap, flatten, filter, groupBy, isFunction, keyBy, map, partition, values, zip } from 'lodash-es';
import Bluebird from 'bluebird';

// Children components
import StudentContainer from "./StudentContainer";
import { getColumnLetter } from "./SeatTable";

const CONCURRENT_CONNECTION_LIMIT = 4;

function isFreeSeat(planSeat, row, letter) {
    return planSeat && planSeat.get((row + 1) + letter) === undefined;
}

class SeatingPlanPanel extends React.Component {
    constructor(props) {
        super(props);
        this.onResetButton = this.onResetButton.bind(this);
        this.onAutoAssignButton = this.onAutoAssignButton.bind(this);
        this.handleCompanyColorChanged = this.handleCompanyColorChanged.bind(this);
        this.state = {
            assigning: false
        };
    }

    componentDidMount() {
        this.clearSeatingPlan();
    }

    // Clear seating plan in case there are students outside of
    // the plan
    async clearSeatingPlan() {
        const { plan, viewingEvent, setPlan } = this.props;
        const { column, row } = plan.seating_plan_type;

        const letters = (new Array(column)).fill(null).map((_, index) => {
            return getColumnLetter(index);
        });

        const deleteSeatingPlanIds = map(filter(plan.seating_plan, seat => seat.sequence > row || !letters.includes(seat.seat)), 'seating_plan_id');
        if (deleteSeatingPlanIds.length > 0) {
            await Bluebird.map(
                deleteSeatingPlanIds,
                (deleteSeatingPlanId) => apiSeatingPlan.deleteSeatingPlanById(deleteSeatingPlanId),
                { concurrency: CONCURRENT_CONNECTION_LIMIT }
            );
            const { event_preparation_id } = viewingEvent;
            const updatedPlan = await apiSeatingPlan.seatingPlanDetail(event_preparation_id);
            setPlan(updatedPlan);
        }
    }

    async onResetButton() {
        const { viewingEvent, setPlan } = this.props;
        const { event_preparation_id } = viewingEvent;
        try {
            await apiSeatingPlan.resetSeatingPlan(event_preparation_id);
            const plan = await apiSeatingPlan.seatingPlanDetail(event_preparation_id);
            setPlan(plan);
        } catch (e) {
            console.error(e);
        }
    }

    getStudentsWithoutSeat(companies, { seating_plan }) {
        const assignedStudentIds = keyBy(seating_plan, 'conference_student');
        const remainingStudentLists = map(companies, company => filter(company.students, student => !assignedStudentIds.hasOwnProperty(student.conference_student_id)));
        return flatten(remainingStudentLists);
    }

    // TODO: optimize the code since it is not very efficient
    assignSeatsInMostEmptyTablesFirst(students, event_preparation_id, row, column, student_per_table) {
        const { plan_seat } = this.props;
        const postBodies = [];
        const studentLists = values(groupBy(students, 'conference_company')).sort((left, right) => right.length - left.length);
        const tableColumnCount = Math.ceil(column / student_per_table) || 0;
        const studentPerTableForLastTable = column % student_per_table || student_per_table;
        const emptySeatGroups = [];

        const testedSeats = {};
        const currentEmptySeatGroupTemplate = {
            seats: [/* {row: 0, col: 0}, {row: 1, col: 1}, ... */],
            // studentPerTable: null,
            firstSeatRow: row,
            firstSeatColumn: column
        };

        // get a group of continuous empty seats in the same table
        function getEmptySeatGroups(seatRow, seatColumn, seatGroup) {
            const letter = getColumnLetter(seatColumn);
            const seatName = (seatRow + 1) + letter;
            if (!testedSeats.hasOwnProperty(seatName)) {
                testedSeats[seatName] = true;
                if (isFreeSeat(plan_seat, seatRow, letter)) {
                    seatGroup.seats.push({
                        row: seatRow,
                        col: seatColumn
                    });

                    const nextSeatRow = seatRow + 1;
                    if (nextSeatRow < row) {
                        getEmptySeatGroups(nextSeatRow, seatColumn, seatGroup);
                    }
                    const previousSeatRow = seatRow - 1;
                    if (previousSeatRow >= 0) {
                        getEmptySeatGroups(previousSeatRow, seatColumn, seatGroup);
                    }
                    const studentPerTable = seatGroup.studentPerTable;
                    const currentTableIndex = Math.floor(seatColumn / studentPerTable);
                    const nextSeatColumn = seatColumn + 1;
                    if (nextSeatColumn < column &&
                        Math.floor(nextSeatColumn / studentPerTable) === currentTableIndex
                    ) {
                        getEmptySeatGroups(seatRow, nextSeatColumn, seatGroup);
                    }
                    const previousSeatColumn = seatColumn - 1;
                    if (previousSeatColumn >= 0 &&
                        Math.floor(previousSeatColumn / studentPerTable) === currentTableIndex
                    ) {
                        getEmptySeatGroups(seatRow, previousSeatColumn, seatGroup);
                    }
                }
            }
        };

        // update seat group data after data is created or after some of the seats are assigned
        function updateSeatGroup(seatGroup) {
            const seats = seatGroup.seats;
            if (seats.length > 0) {
                let firstSeatRow = seatGroup.firstSeatRow;
                let firstSeatColumn = seatGroup.firstSeatColumn;
                seats.sort(function (left, right) {
                    if (left.row < firstSeatRow) {
                        firstSeatRow = left.row;
                    }
                    if (right.row < firstSeatRow) {
                        firstSeatRow = right.row;
                    }
                    if (left.col < firstSeatColumn) {
                        firstSeatColumn = left.col;
                    }
                    if (right.col < firstSeatColumn) {
                        firstSeatColumn = right.col;
                    }
                    return left.row - right.row || left.col - right.col;
                });
                seatGroup.firstSeatRow = firstSeatRow;
                seatGroup.firstSeatColumn = firstSeatColumn;
            } else {
                seatGroup.firstSeatRow = row;
                seatGroup.firstSeatColumn = column;
            }
        }

        function sortEmptySeatGroups() {
            emptySeatGroups.sort(function (left, right) {
                return left.firstSeatRow - right.firstSeatRow ||
                    right.seats.length - left.seats.length ||
                    left.firstSeatColumn - right.firstSeatColumn;
            });
        }

        // group all the empty seats and sort the list by count of empty seats in decending order
        let currentEmptySeatGroup = cloneDeep(currentEmptySeatGroupTemplate);
        for (let currentColumn = 0; currentColumn < column; ++currentColumn) {
            const currentTableIndex = Math.floor(currentColumn / student_per_table);
            const currentStudentPerTable = (currentTableIndex === tableColumnCount - 1)
                ? studentPerTableForLastTable
                : student_per_table;
            if (currentEmptySeatGroup.seats.length === 0) {
                currentEmptySeatGroup.studentPerTable = currentStudentPerTable;
            }
            for (let currentRow = 0; currentRow < row; ++currentRow) {
                if (currentEmptySeatGroup.seats.length === 0) {
                    getEmptySeatGroups(currentRow, currentColumn, currentEmptySeatGroup);
                    if (currentEmptySeatGroup.seats.length > 0) {
                        updateSeatGroup(currentEmptySeatGroup);
                        emptySeatGroups.push(currentEmptySeatGroup);
                        currentEmptySeatGroup = cloneDeep(currentEmptySeatGroupTemplate);
                        currentEmptySeatGroup.studentPerTable = currentStudentPerTable;
                    }
                }
            }
        }
        sortEmptySeatGroups();

        // assign students to empty seats if student can seat together
        function isNotUndefined(item) {
            return item !== undefined;
        }
        function hasAllItems(entry) {
            return entry.every(isNotUndefined);
        }
        function createPostBody(student, seat) {
            return {
                event_preparation: event_preparation_id,
                conference_student: student.conference_student_id,
                seat: getColumnLetter(seat.col),
                desc: 'desc_vaue',
                status: 'assigned',
                sequence: seat.row + 1,
            };
        }
        const remainingStudents = [];
        studentLists.forEach(students => {
            let index = 0;
            let isAssigned = false;
            while (!isAssigned && index < emptySeatGroups.length) {
                const seatGroup = emptySeatGroups[index];
                if (seatGroup.seats.length >= students.length) {
                    const [paired, orphaned] = partition(zip(students, seatGroup.seats), hasAllItems);
                    paired.forEach(pair => {
                        postBodies.push(createPostBody.apply(null, pair));
                    });

                    const remainingSeats = [];
                    orphaned.forEach(entry => {
                        if (entry[0]) {
                            remainingStudents.push(entry[0]);
                        }
                        if (entry[1]) {
                            remainingSeats.push(entry[1]);
                        }
                    });
                    if (remainingSeats.length > 0) {
                        seatGroup.seats = remainingSeats;
                        updateSeatGroup(seatGroup);
                        sortEmptySeatGroups();
                    } else {
                        emptySeatGroups.splice(index, 1);
                    }

                    isAssigned = true;
                }
                ++index;
            }
            if (!isAssigned) {
                students.forEach(student => {
                    remainingStudents.push(student);
                });
            }
        });

        // assign remaining students in case there are still empty seats but in different tables
        if (remainingStudents.length > 0 && emptySeatGroups.length > 0) {
            zip(remainingStudents, flatMap(emptySeatGroups, 'seats')).forEach(pair => {
                if (pair[0] && pair[1]) {
                    postBodies.push(createPostBody.apply(null, pair));
                }
            });
        }

        return Bluebird.map(
            postBodies,
            (postBody) => apiSeatingPlan.createSeatingPlan(postBody),
            { concurrency: CONCURRENT_CONNECTION_LIMIT }
        );
    }

    assignSeats(students, event_preparation_id, row, column, student_per_table) {
        const { plan_seat } = this.props;
        const postBodies = [];

        let tableCount = Math.ceil(column / student_per_table) || 0;
        let studentIndex = 0;

        // loop label for breaking the outer loop from inner loop
        outerLoop:
        for (let t = 0; t < tableCount; ++t) {
            for (let r = 0; r < row; ++r) {
                for (let c = 0; c < student_per_table; ++c) {
                    if (studentIndex >= students.length) {
                        break outerLoop;
                    }
                    const currentColumn = t * student_per_table + c;
                    const letter = getColumnLetter(currentColumn);
                    if (isFreeSeat(plan_seat, r, letter) && currentColumn < column) {
                        postBodies.push({
                            event_preparation: event_preparation_id,
                            conference_student: students[studentIndex].conference_student_id,
                            seat: letter,
                            desc: 'desc_vaue',
                            status: 'assigned',
                            sequence: r + 1,
                        });
                        ++studentIndex;
                    }
                }
            }
        }

        return Bluebird.map(
            postBodies,
            (postBody) => apiSeatingPlan.createSeatingPlan(postBody),
            { concurrency: CONCURRENT_CONNECTION_LIMIT }
        );
    }

    async onAutoAssignButton() {
        const { plan, companies, setPlan } = this.props;
        const { event_preparation_id } = this.props.viewingEvent;
        this.setState({ assigning: true });
        try {
            const { column, row, student_per_table } = plan.seating_plan_type;
            const students = this.getStudentsWithoutSeat(companies, plan);
            await this.assignSeats(students, event_preparation_id, row, column, student_per_table);
        } catch (e) {
            console.error(e);
        }
        const updatedPlan = await apiSeatingPlan.seatingPlanDetail(event_preparation_id);
        setPlan(updatedPlan);
        this.setState({ assigning: false });
    }

    handleCompanyColorChanged(rgb, company) {
        if (isFunction(this.props.onCompanyColorChanged)) {
            this.props.onCompanyColorChanged(rgb, company);
        }
    }

    render() {

        const {
            classes,
            // viewingEvent, 
            companies
        } = this.props;

        return (
            <div className={classes.leftColumn}>
                {
                    this.state.assigning &&
                    <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: 100 }}
                        onClick={(e) => e.preventDefault()}
                        onDoubleClick={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()} />
                }
                <div className={classes.studentsList}>
                    <StudentContainer companies={companies}
                        onCompanyColorChanged={this.handleCompanyColorChanged}
                    />
                </div>
                <div className={classes.bottomBar}>
                    <Button className={classes.bottomButton}
                        onClick={this.onResetButton} >重置排列
                        </Button>
                    <Button className={classes.bottomButton}
                        style={{ borderRight: "unset" }}
                        onClick={this.onAutoAssignButton} >
                        {this.state.assigning ? <CircularProgress /> : "自動排列"}
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    viewingEvent: state.eventReducer.viewingEvent,
    viewingSeminar: state.seminarReducer.viewingSeminar,
    plan: state.seatingPlanReducer.plan,
    plan_seat: state.seatingPlanReducer.plan_seat
});

const mapDispatchToProps = dispatch => ({
    setPlan: (plan) => dispatch(setPlan(plan))
});

const combinedStyles = combineStyles(CommonStyles, SeatingPlanPanelStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(SeatingPlanPanel)));
