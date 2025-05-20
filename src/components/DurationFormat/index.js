import moment from 'moment'

export const getTime = milliseconds => {
  const seconds = moment.duration(milliseconds).seconds()
  const minutes = moment.duration(milliseconds).minutes()
  const time = `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`

  return time
}

export const getDuration = date => {
  const postedDate = moment(date)
  const today = moment()
  return postedDate.from(today)
}
