import React from 'react';
import { connect } from 'react-redux';

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    cursor: "default",
    fontSize: 18
  },
  item: {
    padding: "0 10px",
    // padding: '6px 17px',
    border: '1px solid black',
    marginLeft: 24,
    marginBottom: 5
  },
  seat: {
    // paddingTop: 6,
    marginLeft: 10
  }
};

const StudentListItem = ({ company, plan, student, color, index, onSeat }) => {
  const { conference_student_id } = student;

  return (
    <div style={styles.root}>
      <div draggable={!onSeat}
           onDragStart={(e) => {
               e.dataTransfer.setData("text", JSON.stringify({
                 student_id: conference_student_id,
                 number: `#${index + 1}`,
                 color
               }));
               // A hack to get the information of the dragged student on onDragEnter
               // since we can't use DataTransfer.getData on onDragEnter
               // See https://stackoverflow.com/q/11065803/5717561
               e.dataTransfer.setData(color, "");
           }}
           style={{
             ...styles.item,
             cursor: onSeat ? "default" : "grab",
             backgroundColor: color,
           }} >
        {`${student.name} (${company.brand})`}
      </div>
      <div style={styles.seat}>
        {onSeat && `${onSeat.sequence}${onSeat.seat}`}
      </div>
    </div>
  );
};

const mapStateToProps = (state, { student }) => {
  const { conference_student_id } = student;
  const plan = state.seatingPlanReducer.plan_id;
  return {
    onSeat: plan.get(conference_student_id) || null
  }
};

export default connect(mapStateToProps)(StudentListItem);
