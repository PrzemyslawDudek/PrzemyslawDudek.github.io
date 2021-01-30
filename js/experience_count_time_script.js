window.onload = function() {
    console.log("Start Infinity Interval 400 ms.")
    setInterval(startCountExperienceTime, 400);
}

const date = "Dec 02, 2019 08:00:00 GMT+0100";
const pointOnTimeline = new Date(date);
const timeStart = pointOnTimeline.getTime();
const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

function startCountExperienceTime() {
    let dateNow = new Date();
    let timeDistance = dateNow.getTime() - timeStart;

    let timeCountNow = new TimeCount(dateNow, pointOnTimeline)

    document.getElementById("years").innerText = timeCountNow.getYearDistance();
    document.getElementById("months").innerText = timeCountNow.getMonthDistance();
    document.getElementById("days").innerText = timeCountNow.dayDistance();
    document.getElementById("hours").innerText = getHours(timeDistance);
    document.getElementById("minutes").innerText = getMinutes(timeDistance);
    document.getElementById("seconds").innerText = getSeconds(timeDistance);
}

function getHours(timeDistance) {
    let hours = Math.floor(timeDistance % day / hour);
    if (hours === 0) {
        return hours;
    }
    if (timeDistance >= 0) {
        return hours;
    }
    return hours + 1;
}

function getMinutes(timeDistance) {
    let minutes = Math.floor(timeDistance % hour / minute);
    if (minutes === 0) {
        return minutes;
    }
    if (timeDistance >= 0) {
        return minutes;
    }
    return minutes + 1;
}

function getSeconds(timeDistance) {
    let seconds = Math.floor(timeDistance % minute / second);
    return seconds.toString();
}

function TimeCount(dateNow, pointOnTimeline) {
    if (dateNow.getTime() < pointOnTimeline.getTime()) {
        this.startOfTimeline = dateNow;
        this.endOfTimeline = pointOnTimeline;
    } else {
        this.startOfTimeline = pointOnTimeline;
        this.endOfTimeline = dateNow;
    }
    this.isPast = isPast;
    this.isTheSameYear = isTheSameYear;
    this.isTheSameMonth = isTheSameMonth;
    this.isTheSameDay = isTheSameDay;
    this.getYearDistance = getYearDistance;
    this.getMonthDistance = getMonthDistance;
    this.dayDistance = dayDistance;
    this.isMonthDistanceAtTurnOfTheYear = isMonthDistanceAtTurnOfTheYear;
    this.isFullYearDistance = isFullYearDistance;
    this.getFullYearDistance = getFullYearDistance;
    this.isFullMonthDistance = isFullMonthDistance;
    this.getFullMonthDistance = getFullMonthDistance;
    this.dayOutOfBoundsException = exceptionDayOutOfBound(this.startOfTimeline.getDate(), this.endOfTimeline);
    this.isFullDayDistance = isFullDayDistance;
}

function isPast() {
    let isPast = this.startOfTimeline > this.endOfTimeline;
    if (isPast) {
        console.log("Is Past");
    } else {
        console.log("Is Present");
    }
    return isPast;
}

function isTheSameYear() {
    return (this.startOfTimeline.getFullYear() === this.endOfTimeline.getFullYear())
}

function isTheSameMonth() {
    return (this.startOfTimeline.getMonth() === this.endOfTimeline.getMonth())
}

function isTheSameDay() {
    return (this.startOfTimeline.getDate() === this.endOfTimeline.getDate())
}

function exceptionDayOutOfBound(day, date) {
    let dateMonthDayLength = dayInMonth(date);
    return day > dateMonthDayLength;
}

function getYearDistance() {
    if (this.isTheSameYear()) {
        return 0;
    } else {
        return this.getFullYearDistance();
    }
}

function getFullYearDistance() {
    let yearDistance = this.endOfTimeline.getFullYear() - this.startOfTimeline.getFullYear();
    if (this.dayOutOfBoundsException) {
        return yearDistance;
    }
    if (this.isFullYearDistance()) {
        return yearDistance;
    } else {
        return yearDistance - 1;
    }
}

function getMonthDistance() {
    let monthDistance;
    if (this.isMonthDistanceAtTurnOfTheYear()) {
        monthDistance = 12 - this.startOfTimeline.getMonth() + this.endOfTimeline.getMonth();
    } else {
        monthDistance = this.endOfTimeline.getMonth() - this.startOfTimeline.getMonth();
    }
    return this.getFullMonthDistance(monthDistance);
}

function isMonthDistanceAtTurnOfTheYear() {
    return 0 > (this.endOfTimeline.getMonth() - this.startOfTimeline.getMonth());
}

function getFullMonthDistance(monthDistance) {
    if (this.dayOutOfBoundsException) {
        return monthDistance;
    }
    if (this.isFullMonthDistance()) {
        return monthDistance;
    } else {
        return monthDistance - 1;
    }
}

function isFullYearDistance() {
    let dateStartWithTheSameYearAsDateNow = new Date(this.startOfTimeline);
    dateStartWithTheSameYearAsDateNow.setFullYear(this.endOfTimeline.getFullYear());
    return dateStartWithTheSameYearAsDateNow < this.endOfTimeline;
}

function isFullMonthDistance() {
    let dateStartWithTheSameYearAndMonthAsDateNow = new Date(this.startOfTimeline);
    dateStartWithTheSameYearAndMonthAsDateNow.setFullYear(this.endOfTimeline.getFullYear());
    dateStartWithTheSameYearAndMonthAsDateNow.setMonth(this.endOfTimeline.getMonth());
    return dateStartWithTheSameYearAndMonthAsDateNow < this.endOfTimeline;
}

function isFullDayDistance() {
    let dateStartWithTheSameYearMonthAndDayAsDateNow = new Date(this.startOfTimeline);
    dateStartWithTheSameYearMonthAndDayAsDateNow.setFullYear(this.endOfTimeline.getFullYear());
    dateStartWithTheSameYearMonthAndDayAsDateNow.setMonth(this.endOfTimeline.getMonth());
    dateStartWithTheSameYearMonthAndDayAsDateNow.setDate(this.endOfTimeline.getDate());
    return dateStartWithTheSameYearMonthAndDayAsDateNow < this.endOfTimeline;
}

function dayInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getDaysInOneMonthBefore(date) {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
}

function dayDistance() {

    let timeDistance = this.endOfTimeline.getTime() - this.startOfTimeline.getTime();
    let distance = this.endOfTimeline.getDate() - this.startOfTimeline.getDate();
    let daysInOneMonthBefore = getDaysInOneMonthBefore(this.endOfTimeline);
    let fullDayDistance = this.isFullDayDistance();

    if (timeDistance === 0) {
        return 0;
    }
    if (distance > 0) {
        if (fullDayDistance) {
            return distance;
        }
        return distance - 1;
    } else {
        if (fullDayDistance) {
            return daysInOneMonthBefore - this.startOfTimeline.getDate() +  this.endOfTimeline.getDate();
        }
        return daysInOneMonthBefore - this.startOfTimeline.getDate() + this.endOfTimeline.getDate() - 1;
    }

}