// Essential for all components
import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/common'
import { SchedulingStyles } from '../../utils/01MaterialJsStyles/Scheduling.js'
import combineStyles from '../../utils/01MaterialJsStyles/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import {
    Card, CardContent,
    Typography, Select, MenuItem, Input,
    FormControl, InputAdornment, TextField,
} from '@material-ui/core';
import {
    Search as SearchIcon
    // , Close,
} from '@material-ui/icons';

// Api
import { apiConferences } from '../../Api/ApiConferences';
import { apiEventPpt } from '../../Api/ApiEventPpt';

// Redux
import { connect } from 'react-redux';
import { addEvent } from '../../Redux/Action/eventAction';
import { setViewingSeminar } from '../../Redux/Action/seminarAction';
import { CourseTypesMap } from '../../Redux/Constant/StaticTypes';

// Utils
import { autoScrollTop } from '../../Util/ScrollToTop';
import { emitter, EventTypes } from '../../Util/EventEmitter';
import { dateToDayMonthYear, dateToRemainingDays } from '../../Util/DateUtils';
import moment from 'moment';
import FuzzySearch from 'fuzzy-search';
import { isArray, sortBy } from 'lodash-es';

// Children components
import BreadCrumb from '../../components/100Include/breadcrumb';
import Calendar from '../../components/Calendar';

class Scheduling extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seminars: [],
            sortType: 'teachers',
            enableSearch: true,
            seminarsSearch: [],
            milestone: localStorage.startDate ? moment.unix(localStorage.startDate) : moment().unix(),
        };
    }

    componentDidMount() {
        // Load current date's seminar. If they are empty, load the current
        // this._loadData(moment().unix());

        const date = this.state.milestone;

        const start = moment.unix(date).startOf('day').valueOf();
        const end = moment.unix(date).endOf('day').valueOf();

        const cb = (obj) => {
            console.log("cb : ", obj);
            const { sortType } = this.state;
            this.setState({ seminars: sortBy(obj.body, sortType, 'start_date') });

            const startM = moment().startOf('month').valueOf();
            const endM = moment().endOf('month').valueOf();

            const cb = (obj) => {
                // console.log("cb : ", obj);
                const { sortType } = this.state;
                return this.setState({
                    ...this.state,
                    seminars: sortBy(obj.body, sortType, 'start_date')
                });
            }
            const eCb = (obj) => {
                console.log("eCb : ", obj);
            }
            const params = ({ seminars: sortBy(obj.body, sortType, 'start_date') });

            apiConferences.getConferenceList(params, this.props.auth.token, cb, eCb);

            // return apiConferences.getConferenceList({ 'start_date[between]': `${startM},${endM}` })
            //     .then((rs) => {
            //         if (rs && !rs.error && rs.length > 0) {
            //             const { sortType } = this.state;
            //             return this.setState({ seminars: sortBy(rs, sortType, 'start_date') });
            //         }
            //     });

        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }
        const params = ({ take_place_from: start, take_place_to: end });

        apiConferences.getConferenceList(params, this.props.auth.token, cb, eCb);

        // apiConferences.getConferenceList(params, this.props.auth.token, cb, eCb) // { take_place_from: start, take_place_to: end }
        //     .then((rs) => {
        //         if (rs && !rs.error && rs.length > 0) {
        //             const { sortType } = this.state;
        //             return this.setState({ seminars: sortBy(rs, sortType, 'start_date') });
        //         }
        //         // const startM = moment().startOf('month').valueOf();
        //         // const endM = moment().endOf('month').valueOf();
        //         // return apiConferences.getConferenceList({ 'start_date[between]': `${startM},${endM}` })
        //         //   .then((rs) => {
        //         //     if (rs && !rs.error && rs.length > 0) {
        //         //       const { sortType } = this.state;
        //         //       return this.setState({ seminars: sortBy(rs, sortType, 'start_date') });
        //         //     }
        //         //   });
        //     })
        //     .catch(err => console.log(err));

        // The rest is still normal...
        emitter.addListener(EventTypes.SHOW_SEMINAR_SEARCH, (type) => {
            if (type === 2) {
                this.setState({ enableSearch: !this.state.enableSearch }, () => {
                    if (this.state.enableSearch) {
                        // const { milestone } = this.state;
                        // this._loadData(milestone);
                        console.log('da vao nhe');
                        this.setState({ seminarsSearch: this.state.seminars });
                    } else {
                        const { milestone } = this.state;
                        this._loadData(milestone);
                    }
                });
            }
        });
    }

    // componentWillUnmount() {
    //     emitter.removeListener(EventTypes.SHOW_SEMINAR_SEARCH);
    // }

    handleClick = (seminar) => {
        const { history, dispatch } = this.props;
        console.log('dsad');
        apiConferences.getConferenceDefail(seminar.conference_id)
            .then((resp) => {
                if (resp.conference_id) {
                    this.getEventPptData(resp.conference_id);
                    dispatch(setViewingSeminar(resp));
                    history.push({ pathname: '/basicinfo', state: { prePath: '/scheduling' } });
                }
            });
    }

    getEventPptData = (conferenceId) => {
        const { dispatch } = this.props;
        apiEventPpt.getEventPptList(conferenceId)
            .then((resp) => {
                console.log('eventsPPt: ', resp);
                if (isArray(resp)) {
                    dispatch(addEvent(resp));
                }
            })
            .catch(e => console.log(e));
    }

    onSearch = (evt) => {
        const keyword = evt.target.value;
        const searcher = new FuzzySearch(this.state.seminarsSearch, ['name', 'teachers'], {
            caseSensitive: true,
        });
        const result = searcher.search(keyword);
        console.log(result)
        this.setState({
            seminars: result
        })
    }

    handleChangeType = (e) => {
        const type = e.target.value;
        const { seminars } = this.state;
        this.setState({ sortType: type, seminars: sortBy(seminars, type, 'start_date') });
    }

    _loadDataInMonth(milestone) {
        console.log('mile', milestone);
        const start = moment(milestone).startOf('month').valueOf();
        const end = moment(milestone).endOf('month').valueOf();

        apiConferences.getConferenceList({ take_place_from: start, take_place_to: end })
            .then((rs) => {
                if (rs && !rs.error) {
                    const { sortType } = this.state;
                    this.setState({ seminars: sortBy(rs, sortType, 'start_date') });
                    this.setState({ seminarsSearch: sortBy(rs, sortType, 'start_date') });
                } else {
                    this.setState({ seminars: [] });
                    this.setState({ seminarsSearch: [] });
                }
            }).catch(err => console.log(err));
    }

    _loadData(date) {
        this.setState({ milestone: date });
        console.log('date...........', date);
        localStorage.setItem("startDate", date);
        const start = moment.unix(date).startOf('day').valueOf();
        const end = moment.unix(date).endOf('day').valueOf();

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const { sortType } = this.state;
            this.setState({
                ...this.state,
                seminars: sortBy(obj.body, sortType, 'start_date'),
                seminarsSearch: sortBy(obj.body, sortType, 'start_date')
            });
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }
        const params = ({ take_place_from: start, take_place_to: end });

        apiConferences.getConferenceList(params, this.props.auth.token, cb, eCb);

        // apiConferences.getConferenceList({ take_place_from: start, take_place_to: end }) // { take_place_from: start, take_place_to: end }
        //     .then((rs) => {
        //         console.log(rs);
        //         if (rs && !rs.error) {
        //             const { sortType } = this.state;
        //             this.setState({ seminars: sortBy(rs, sortType, 'start_date') });
        //             this.setState({ seminarsSearch: sortBy(rs, sortType, 'start_date') });
        //         } else {
        //             this.setState({ seminars: [] });
        //             this.setState({ seminarsSearch: [] });
        //         }
        //     }).catch(err => console.log(err));
    }

    render() {
        const { classes } = this.props;
        const { seminars, sortType, enableSearch } = this.state;

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">報名歷史</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <div className={classes.root}>
                                    <div className={classes.content}>
                                        <div className={classes.middleContent}>
                                            {(
                                                <div className={classes.calendarWrapper}>
                                                    <Calendar
                                                        startDate={localStorage.startDate}
                                                        onDatePicked={d => this._loadData(d)}
                                                        onChoseMonth={(milestone) => {
                                                            this.setState({ milestone });
                                                            this._loadDataInMonth(milestone);
                                                        }}
                                                        showHeader={false}
                                                    />
                                                </div>
                                            )}
                                            <div className={classes.wrapper}>
                                                {(
                                                    <div className={classes.seminarTag}>
                                                        <Typography className={classes.subToolbarText}>项目</Typography>
                                                        {
                                                            enableSearch && (
                                                                <div className={classes.searchBar}>
                                                                    <TextField
                                                                        fullWidth
                                                                        onChange={this.onSearch}
                                                                        InputProps={{
                                                                            endAdornment: (
                                                                                <InputAdornment position="start">
                                                                                    <SearchIcon />
                                                                                </InputAdornment>
                                                                            ),
                                                                        }}
                                                                    />
                                                                </div>
                                                            )
                                                        }
                                                        <FormControl className={classes.formControl}>
                                                            <Select
                                                                displayEmpty
                                                                value={sortType}
                                                                onChange={this.handleChangeType}
                                                                input={<Input disableUnderline />}
                                                            >
                                                                <MenuItem value="teachers">老师</MenuItem>
                                                                <MenuItem value="start_date">时间</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                )}
                                                {/* {(
                                                    <div className={classes.searchBar}>
                                                        <TextField
                                                            fullWidth
                                                            onChange={this.onSearch}
                                                            InputProps={{
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <SearchIcon />
                                                                    </InputAdornment>
                                                                ),
                                                                endAdornment: (
                                                                    <Close
                                                                        onClick={() => {
                                                                            this.setState({ enableSearch: false }, () => {
                                                                                const { milestone } = this.state;
                                                                                this._loadData(milestone);
                                                                            });
                                                                        }}
                                                                        style={{ color: '#000' }}
                                                                        className={classes.closeButton}
                                                                    />
                                                                ),
                                                            }}
                                                        />
                                                    </div>
                                                )} */}
                                                <div className={classes.cardWrapper}>
                                                    {seminars.map(n => (
                                                        <button type="button" key={Math.random()} className={classes.seminarItem} onClick={() => this.handleClick(n)}>
                                                            <Card className={classes.frontCard} key={Math.random()}>
                                                                <Typography variant="subtitle1">
                                                                    {CourseTypesMap[n.type]}
                                                                </Typography>
                                                                <Typography variant="subtitle1">
                                                                    {dateToRemainingDays(n.start_date)}
                                                                </Typography>
                                                            </Card>
                                                            <Card className={classes.card} key={n.name}>
                                                                <CardContent style={{ paddingBottom: '0px', paddingTop: '0px' }}>
                                                                    <div className={classes.rowWrapper}>
                                                                        <div className={classes.row} style={{ marginBottom: '2px' }}>
                                                                            <Typography
                                                                                variant="subtitle1"
                                                                                style={{ marginLeft: '30px' }}
                                                                            >
                                                                                {n.name}
                                                                            </Typography>
                                                                            <Typography
                                                                                variant="subtitle1"
                                                                                className={classes.rightColumnTypography}
                                                                            >
                                                                                {dateToDayMonthYear(n.start_date)}
                                                                            </Typography>
                                                                        </div>
                                                                        <div className={classes.row} style={{ marginTop: '2px' }}>
                                                                            {/* <Typography
                                                                                variant="subtitle1"
                                                                                style={{ marginLeft: '30px' }}
                                                                            >{n.teachers.toString()}</Typography> */}
                                                                            {/* <Typography
                                                                                variant="subtitle1"
                                                                                className={classes.rightColumnTypography}
                                                                            >{n.location}</Typography> */}
                                                                        </div>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Scheduling.propTypes = {
    classes: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    seminars: state.seminarReducer.seminars,
});

const combinedStyles = combineStyles(CommonStyles, SchedulingStyles);

export default withTranslation()(autoScrollTop(connect(mapStateToProps, null)(withStyles(combinedStyles)(Scheduling))));

