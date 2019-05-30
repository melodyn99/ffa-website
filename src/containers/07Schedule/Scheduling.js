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

        this._seminarCurrentDate();

        // The rest is still normal...
        // emitter.addListener(EventTypes.SHOW_SEMINAR_SEARCH, (type) => {
        //     console.log('hello');
        //     if (type === 2) {
        //         this.setState({ enableSearch: !this.state.enableSearch }, () => {
        //             if (this.state.enableSearch) {
        //                 // const { milestone } = this.state;
        //                 // this._loadData(milestone);
        //                 console.log('da vao nhe');
        //                 this.setState({ seminarsSearch: this.state.seminars });
        //             } else {
        //                 const { milestone } = this.state;
        //                 this._loadData(milestone);
        //             }
        //         });
        //     }
        // });
    }

    _seminarCurrentDate = () => {
        const date = this.state.milestone;

        const start = moment.unix(date).startOf('day').valueOf();
        const end = moment.unix(date).endOf('day').valueOf();

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const { sortType } = this.state;
            this.setState({
                ...this.state,
                seminars: sortBy(obj.body, sortType, 'start_date')
            }, () => {
                this._seminarCurrentMonth();
            });
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }
        const params = ({
            take_place_from: start,
            take_place_to: end
        });

        apiConferences.getConferenceList(params, this.props.auth.token, cb, eCb);
    }

    _seminarCurrentMonth = () => {
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
        const params = ({
            'start_date[between]': `${startM},${endM}`
        });

        apiConferences.getConferenceList(params, this.props.auth.token, cb, eCb);
    }

    // List view
    _clickOneSeminar = (seminar) => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            this._getEventPreparationData(obj.body.conference_id);
            this.props.setViewingSeminar(obj.body);
            // history.push({ pathname: '/basicinfo', state: { prePath: '/scheduling' } });
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }
        const params = ({
            $expand: `conference_officers/user,conference_sections/teachers,conference_sections/time_managements,contracts/contract_teachers,contracts/company,contracts/contract_file,contracts/contract_incomes`
        });

        apiConferences.getConferenceDefail(seminar.conference_id, params, this.props.auth.token, cb, eCb);
    }

    _getEventPreparationData = (conferenceId) => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            this.props.addEvent(obj.body);
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }
        const params = ({
            conference: conferenceId,
            $expand: 'conference',
            $orderby: 'createddate desc'
        });

        apiEventPpt.getEventPptList(params, this.props.auth.token, cb, eCb);
    }

    _onSearch = (evt) => {
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

    _handleChangeType = (e) => {
        const type = e.target.value;
        const { seminars } = this.state;
        this.setState({
            ...this.state,
            sortType: type,
            seminars: sortBy(seminars, type, 'start_date')
        });
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
        const params = ({
            take_place_from: start,
            take_place_to: end
        });

        apiConferences.getConferenceList(params, this.props.auth.token, cb, eCb);
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
                                                                        onChange={this._onSearch}
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
                                                                onChange={this._handleChangeType}
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
                                                            onChange={this._onSearch}
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
                                                    {seminars.map((n, i) => (
                                                        <button type="button" key={i} className={classes.seminarItem} onClick={() => this._clickOneSeminar(n)}>
                                                            <Card className={classes.frontCard}>
                                                                <Typography variant="subtitle1">{CourseTypesMap[n.type]}</Typography>
                                                                <Typography variant="subtitle1">{dateToRemainingDays(n.start_date)}</Typography>
                                                            </Card>
                                                            <Card className={classes.card}>
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
    // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    seminars: state.seminarReducer.seminars,
});

const mapDispatchToProps = dispatch => ({
    setViewingSeminar: data => dispatch(setViewingSeminar(data)),
    addEvent: data => dispatch(addEvent(data)),
});

const combinedStyles = combineStyles(CommonStyles, SchedulingStyles);

export default withTranslation()(autoScrollTop(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(Scheduling))));

