// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';

// Api
// import { apiAuth } from '../../Api/ApiAuth';
// import { apiConferences } from '../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
// import { desc } from '../../utils/02MaterialDesign/Table';
import { getSorting } from '../../utils/02MaterialDesign/Table';

// Children components
import BreadCrumb from '../../components/100Include/breadcrumb';
import EnhancedTableHead from '../../components/103MaterialDesign/Table/EnhancedTableHead';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
    counter += 1;
    return { id: counter, name, calories, fat, carbs, protein };
}

const rows = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Dessert (100g serving)' },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        data: [
            createData('Cupcake', 305, 3.7, 67, 4.3),
            createData('Donut', 452, 25.0, 51, 4.9),
            createData('Eclair', 262, 16.0, 24, 6.0),
            createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            createData('Gingerbread', 356, 16.0, 49, 3.9),
            createData('Honeycomb', 408, 3.2, 87, 6.5),
            createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
            createData('Jelly Bean', 375, 0.0, 94, 0.0),
            createData('KitKat', 518, 26.0, 65, 7.0),
            createData('Lollipop', 392, 0.2, 98, 0.0),
            createData('Marshmallow', 318, 0, 81, 2.0),
            createData('Nougat', 360, 19.0, 9, 37.0),
            createData('Oreo', 437, 18.0, 63, 4.0),
        ],
        page: 0,
        rowsPerPage: 10,
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">学生管理</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <Paper className={classes.paper}>
                                    <div className={classes.tableWrapper}>
                                        <Table className={classes.table} aria-labelledby="tableTitle">
                                            <EnhancedTableHead
                                                numSelected={selected.length}
                                                order={order}
                                                orderBy={orderBy}
                                                onSelectAllClick={this.handleSelectAllClick}
                                                onRequestSort={this.handleRequestSort}
                                                rowCount={data.length}
                                                rows={rows}
                                            />
                                            <TableBody>
                                                {data
                                                    .sort(getSorting(order, orderBy))
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map(n => {
                                                        const isSelected = this.isSelected(n.id);
                                                        return (
                                                            <TableRow
                                                                hover
                                                                onClick={event => this.handleClick(event, n.id)}
                                                                role="checkbox"
                                                                aria-checked={isSelected}
                                                                tabIndex={-1}
                                                                key={n.id}
                                                                selected={isSelected}
                                                            >
                                                                {/* <TableCell padding="checkbox">
                                                                    <Checkbox checked={isSelected} />
                                                                </TableCell> */}
                                                                <TableCell component="th" scope="row"
                                                                // padding="none"
                                                                >
                                                                    {n.name}
                                                                </TableCell>
                                                                <TableCell>{n.calories}</TableCell>
                                                                <TableCell>{n.fat}</TableCell>
                                                                <TableCell>{n.carbs}</TableCell>
                                                                <TableCell>{n.protein}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 49 * emptyRows }}>
                                                        <TableCell colSpan={6} />
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <TablePagination
                                        component="div"
                                        count={data.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        backIconButtonProps={{
                                            'aria-label': 'Previous Page',
                                        }}
                                        nextIconButtonProps={{
                                            'aria-label': 'Next Page',
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </Paper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    // loginP: data => dispatch(login(data)),
    // verifyT: token => dispatch(verifyToken(token)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(EnhancedTable)));
