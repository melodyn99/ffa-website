// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/00Common/common'
import { StudentListItemStyles } from '../../utils/01MaterialJsStyles/08SeatingPlan/StudentListItem'
import combineStyles from '../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';

// Redux
import { connect } from 'react-redux';

class StudentListItem extends React.Component {

	render() {
		const { company, plan, student, color, index, classes } = this.props;
		const onSeat = plan.conference_student_id;
		const { conference_student_id } = student;

		return (
			<div className={classes.rootStudentListItem}>
				<div
					draggable={!onSeat}
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
					className={classes.item}
					style={{
						cursor: onSeat ? "default" : "grab",
						backgroundColor: color,
					}}
				>
					{`${student.name} (${company.brand})`}
				</div>
				<div className={classes.seat}>
					{onSeat && `${onSeat.sequence}${onSeat.seat}`}12
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	plan: state.seatingPlanReducer.plan_id,
});

const combinedStyles = combineStyles(CommonStyles, StudentListItemStyles);

export default withTranslation()(connect(mapStateToProps, null)(withStyles(combinedStyles)(StudentListItem)));
