// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/common'
import { StudentListItemStyles } from '../../utils/01MaterialJsStyles/StudentListItem'
import combineStyles from '../../utils/01MaterialJsStyles/combineStyles';
import { withStyles } from '@material-ui/core/styles';

// Redux
import { connect } from 'react-redux';

const StudentListItem = ({ company,
	// plan, 
	student, color, index, onSeat
	// , classes 
}) => {
	const { conference_student_id } = student;

	return (
		<div
		// style={classes.root}
		>
			<div
				// draggable={!onSeat}
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
			// style={{
			// 	...classes.item,
			// 	cursor: onSeat ? "default" : "grab",
			// 	backgroundColor: color,
			// }} 
			>
				{`${student.name} (${company.brand})`}
			</div>
			<div
			// style={classes.seat}
			>
				{onSeat && `${onSeat.sequence}${onSeat.seat}`}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
	// const {conference_student_id} = student;
	// const plan = state.seatingPlanReducer.plan_id;
	// return {
	//   onSeat: plan.get(conference_student_id) || null
	// }
});

const combinedStyles = combineStyles(CommonStyles, StudentListItemStyles);

export default withTranslation()(connect(mapStateToProps, null)(withStyles(combinedStyles)(StudentListItem)));
