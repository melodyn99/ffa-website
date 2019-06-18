// Essential for all components
import React from 'react';

// Api
import { apiSeatingPlan } from '../../Api/ApiSeatingPlan';

// Redux
import { connect } from 'react-redux';
import { setPlan } from '../../Redux/Action/seatingPlanAction';

// Utils
import Tooltip from '@material-ui/core/Tooltip';

export const makeColorString = ({ r, g, b }) => {
    return (
        "#"
        + `${("00" + (r).toString(16)).slice(-2)}`
        + `${("00" + (g).toString(16)).slice(-2)}`
        + `${("00" + (b).toString(16)).slice(-2)}`
    );
}

export const getStudentNumber = (companies, studentId) => {
    for (const company of companies) {
        const index = company.students.findIndex(s => s.conference_student_id === studentId);
        if (index >= 0) {
            return "#" + (index + 1).toString();
        }
    }
    return "??";
}

export const getStudentName = (companies, studentId) => {
    for (const company of companies) {
        const student = company.students.find(s => s.conference_student_id === studentId);
        if (student) {
            return student.name || "??";
        }
    }
    return "??";
}

class Seat extends React.Component {
    constructor(props) {
        super(props);

        // const { letter, plan, row } = this.props;

        this.moved = false;
        this.dropped = null;
        this.deleted = false;
        this.reserved = false;
        this.state = {
            over: null
        };
    }

    async updateSeat(studentId, old_id) {
        const { letter, row, viewingEvent, setPlan } = this.props;

        try {
            await Promise.all([
                old_id && apiSeatingPlan.deleteSeatingPlanById(old_id),
                apiSeatingPlan.createSeatingPlan({
                    event_preparation: viewingEvent.event_preparation_id,
                    conference_student: studentId,
                    seat: letter,
                    desc: 'desc_vaue',
                    status: 'assigned',
                    sequence: row + 1,
                })
            ]);

            const plan = await apiSeatingPlan.seatingPlanDetail(viewingEvent.event_preparation_id);

            this.setState({ over: null });
            setPlan(plan);
        } catch (_) {
            this.setState({ over: null });
        }
    }

    async exchangeSeat({ moved, current }) {
        const { viewingEvent, setPlan } = this.props;

        try {
            await Promise.all([
                moved.old_id && apiSeatingPlan.deleteSeatingPlanById(moved.old_id),
                moved.old_id && apiSeatingPlan.createSeatingPlan({
                    event_preparation: viewingEvent.event_preparation_id,
                    conference_student: current.id,
                    seat: moved.letter,
                    desc: 'desc_vaue',
                    status: 'assigned',
                    sequence: moved.row + 1,
                }),
                apiSeatingPlan.deleteSeatingPlanById(current.old_id),
                apiSeatingPlan.createSeatingPlan({
                    event_preparation: viewingEvent.event_preparation_id,
                    conference_student: moved.id,
                    seat: current.letter,
                    desc: 'desc_vaue',
                    status: 'assigned',
                    sequence: current.row + 1,
                })
            ]);

            const plan = await apiSeatingPlan.seatingPlanDetail(viewingEvent.event_preparation_id);

            this.setState({ over: null });
            setPlan(plan);
        } catch (_) {
            this.setState({ over: null });
        }
    }

    async deleteSeat() {
        const { seating_plan_id } = this.props.onSeat;
        const { viewingEvent, setPlan } = this.props;

        await apiSeatingPlan.deleteSeatingPlanById(seating_plan_id);
        const plan = await apiSeatingPlan.seatingPlanDetail(viewingEvent.event_preparation_id);

        setPlan(plan);
    }

    async setReserved() {
        const { viewingEvent, letter, row, setPlan } = this.props;

        await apiSeatingPlan.createSeatingPlan({
            event_preparation: viewingEvent.event_preparation_id,
            conference_student: null,
            seat: letter,
            desc: 'desc_vaue',
            status: 'reserved',
            sequence: row + 1,
        });

        const plan = await apiSeatingPlan.seatingPlanDetail(viewingEvent.event_preparation_id);
        setPlan(plan);
    }

    render() {
        const {
            letter,
            // plan, viewingEvent,
            row, companies, onSeat, view
        } = this.props;

        const style = {
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `rotate(${view === "bottom" ? 180 : 0}deg)`
        };

        // onSeat: plan_seat.get(`${row + 1}${letter}`) || null

        if (this.reserved || (!this.deleted && onSeat && onSeat.status === "reserved")) {
            this.reserved = false;
            return (
                <div style={{ backgroundColor: "red", ...style }}
                    onDoubleClick={(e) => {
                        e.preventDefault();
                        this.deleted = true;
                        this.forceUpdate();
                        this.deleteSeat();
                    }} >留座</div>
            );
        }

        if (!this.moved && !this.deleted && onSeat && onSeat.status === "assigned") {
            const color = makeColorString(onSeat);
            const number = getStudentNumber(companies, onSeat.conference_student);
            const name = getStudentName(companies, onSeat.conference_student);
            const textStyle = {
                textOverflow: "ellipsis",
                overflowX: "hidden"
            };
            const brandName = onSeat ? onSeat.student_brand : '';
            return (
                <div style={{ backgroundColor: color, ...style, cursor: "grab" }}
                    onDoubleClick={(e) => {
                        e.preventDefault();
                        this.deleted = true;
                        this.forceUpdate();
                        this.deleteSeat();
                    }}
                    draggable={true}
                    onDragStart={(e) => {
                        e.dataTransfer.setData("text", JSON.stringify({
                            student_id: onSeat.conference_student,
                            old_id: onSeat.seating_plan_id,
                            row: this.props.row,
                            letter: this.props.letter,
                            number, color
                        }));
                        e.dataTransfer.setData(color, "");
                    }}
                    onDragEnd={(e) => {
                        if (e.dataTransfer.dropEffect === "move") {
                            this.moved = true;
                            this.setState({ over: null });
                        }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const { student_id, old_id, number, row, letter } = JSON.parse(e.dataTransfer.getData("text"));
                        this.dropped = number;
                        this.forceUpdate();
                        this.exchangeSeat({
                            moved: { id: student_id, old_id, row, letter },
                            current: {
                                id: onSeat.conference_student,
                                old_id: onSeat.seating_plan_id,
                                row: this.props.row,
                                letter: this.props.letter
                            }
                        });
                    }}>
                    <Tooltip
                        title={
                            <React.Fragment>
                                <div className="studentNameInSeatTooltip">{name}</div>
                                <div className="brandNameInSeatTooltip">{brandName}</div>
                            </React.Fragment>
                        }
                    >
                        <div style={{
                            position: "absolute",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            left: 0,
                            right: 0,
                            maxWidth: "inherit"
                        }}>
                            <div className="studentNameInSeat" style={textStyle}>{name}</div>
                            <div className="brandNameInSeat" style={textStyle}>{brandName}</div>
                        </div>
                    </Tooltip>
                </div>
            );
        }

        const { dropped } = this;
        this.dropped = null;
        this.deleted = false;
        this.moved = null;

        if (dropped) {
            return (
                <div style={{ ...style, backgroundColor: this.state.over, color: "grey" }} >
                    {dropped}
                </div>
            );
        }

        return (
            <div style={{ ...style, backgroundColor: this.state.over, color: "grey" }}
                onDoubleClick={(e) => {
                    e.preventDefault();
                    this.reserved = true;
                    this.forceUpdate();
                    this.setReserved();
                }}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => this.setState({ over: e.dataTransfer.types[1] })}
                onDragLeave={() => this.setState({ over: null })}
                onDrop={(e) => {
                    e.preventDefault();
                    const { student_id, old_id, number } = JSON.parse(e.dataTransfer.getData("text"));
                    this.dropped = number;
                    this.forceUpdate();
                    this.updateSeat(student_id, old_id);
                }}>
                {(row + 1) + letter}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    plan: state.seatingPlanReducer,
    viewingEvent: state.eventReducer.viewingEvent,
    viewingSeminar: state.seminarReducer.viewingSeminar,

});

const mapDispatchToProps = dispatch => ({
    setPlan: (plan) => dispatch(setPlan(plan))
});

export default connect(mapStateToProps, mapDispatchToProps)(Seat);
