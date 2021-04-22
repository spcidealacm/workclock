import React from "react";
import ReactDOM from "react-dom";
import "./Clock.css";

class Clock extends React.Component {
    constructor() {
        super();
        this.node_hr = React.createRef();
        this.node_mn = React.createRef();
        this.node_sc = React.createRef();

        this.state = {
            year: 0,
            month: 0,
            day: 0,
            hour: 0,
            min: 0,
            sec: 0,
        };
    }

    componentDidMount() {
        this.run();
        console.log("DidMount");
    }

    addZero(obj) {
        if (obj < 10) return "0" + obj;
        else return obj;
    }

    run() {
        const deg = 6;

        const hr = ReactDOM.findDOMNode(this.node_hr.current);
        const mn = ReactDOM.findDOMNode(this.node_mn.current);
        const sc = ReactDOM.findDOMNode(this.node_sc.current);

        setInterval(() => {
            let now = new Date();
            let day = new Date(now.getTime() + this.props.timezone * 3600000);
            let hh = day.getUTCHours() * 30;
            let mm = day.getUTCMinutes() * deg;
            let ss = day.getUTCSeconds() * deg;
            hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
            mn.style.transform = `rotateZ(${mm}deg)`;
            sc.style.transform = `rotateZ(${ss}deg)`;
            this.setState({
                year: day.getUTCFullYear(),
                month: day.getUTCMonth() + 1,
                day: day.getUTCDate(),
                hour: this.addZero(day.getUTCHours()),
                min: this.addZero(day.getUTCMinutes()),
                sec: this.addZero(day.getUTCSeconds()),
            });
        }, 1);
    }

    render() {
        let { year, month, day, hour, min, sec } = this.state;
        // hour = 19;
        const date_1 = `${year}-${month}-${day} ${hour}:${min}:${sec}`;
        let bgClass = "background";
        let ckClass = "clock";
        let hrClass = "hr";
        let mnClass = "mn";
        let scClass = "sc";
        let ctClass = "city";
        let tmClass = "time";
        if (+hour >= 18 || +hour <= 6) {
            bgClass += " background_black";
            ckClass += " clock_black";
            hrClass = "hr_bk";
            mnClass = "mn_bk";
            scClass = "sc_bk";
            ctClass += " city_bk";
            tmClass += " time_bk";
        }
        // console.log(bgClass);    
        return (
            <div className={bgClass}>
                <span className={ctClass}>{this.props.city}</span>
                <div className={ckClass}>
                    <div className="hour">
                        <div className={hrClass} ref={this.node_hr}></div>
                    </div>
                    <div className="min">
                        <div className={mnClass} ref={this.node_mn}></div>
                    </div>
                    <div className="sec">
                        <div className={scClass} ref={this.node_sc}></div>
                    </div>
                </div>
                <span className={tmClass}>{date_1}</span>
            </div>
        );
    }
}

export default Clock;
