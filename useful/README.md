# Javascript Helpers

Here are some commonly used functions you may use throughout the project

# Table of contents

- [File size parser](#file-size-parser)
- [Number separator by comma](#number-separator-by-comma)
- [Convert Enter (\n) characters to lists](#convert-enter-n-characters-to-lists)
- [Timer](#timer)
- [Timer by units](#timer-by-units)
- [Find the day of the year](#find-the-day-of-the-year)
- [Date validity test](#date-validity-test)
- [Find the number of days between two dates](#find-the-number-of-days-between-two-dates)
- [Unix time](#unix-time)
- [The average of numbers calculation](#the-average-of-numbers-calculation)
- [Get selected text](#get-selected-text)
- [Is prime numbers](#is-prime-numbers)
- [Reverse-string](#reverse-string)
- [Random HEX code generation](#random-hex-code-generation)
- [Random PIN generator (Personal Identification Number)](#random-pin-generator-personal-identification-number)
- [Random number generate between maximum and minimum](#random-number-generate-between-maximum-and-minimum)
- [Copy to clipboard](#copy-to-clipboard)
- [Limit string to character](#limit-string-to-character)

## File size parser

```js
const fileSizeParser = (fileSize, decimalPoint) => {
    try {
        if (fileSize == undefined)
            throw new Error("Parameter is required")

        // converts human-readable files size to bytes
        if (typeof fileSize === "string") {
            if (fileSize.length <= 0 || fileSize.trim() == '')
                throw new Error("Parameter is required")

            let size = parseFloat(fileSize)
            let unit = fileSize.toString().split('').filter(item => isNaN(item) == true)
                .join('').replace(/\./g, '').trim()

            if (isNaN(size))
                throw new Error('Invalid parameter')

            let unitBases = [
                [["b", "bit", "bits"], 1 / 8],
                [["B", "Byte", "Bytes", "bytes"], 1],
                [["Kb"], 128],
                [["k", "K", "kb", "KB", "KiB", "Ki", "ki"], 1024],
                [["Mb"], 131072],
                [["m", "M", "mb", "MB", "MiB", "Mi", "mi"], Math.pow(1024, 2)],
                [["Gb"], 1.342e+8],
                [["g", "G", "gb", "GB", "GiB", "Gi", "gi"], Math.pow(1024, 3)],
                [["Tb"], 1.374e+11],
                [["t", "T", "tb", "TB", "TiB", "Ti", "ti"], Math.pow(1024, 4)],
                [["Pb"], 1.407e+14],
                [["p", "P", "pb", "PB", "PiB", "Pi", "pi"], Math.pow(1024, 5)],
                [["Eb"], 1.441e+17],
                [["e", "E", "eb", "EB", "EiB", "Ei", "ei"], Math.pow(1024, 6)]
            ]

            for (const units of unitBases) {
                if (units[0].includes(unit)) {
                    return size * units[1]
                }
            }

            // converts bytes to human-readable files size
        } else if (typeof fileSize === "number") {
            if (fileSize === 0) return '0 Bytes'

            let base = 1024
            decimalPoint = decimalPoint || 2
            let units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            let quotient = Math.floor(Math.log(fileSize) / Math.log(base))
            return `${parseFloat((fileSize / Math.pow(base, quotient)).toFixed(decimalPoint))} ${units[quotient]}`
        }

        throw new Error('Invalid parameter')
    } catch (error) {
        return error
    }
}

// Errors
fileSizeParser('') // Error => Parameter is required
fileSizeParser('MB') // Error => Invalid parameter

// converts human-readable files size to bytes 
fileSizeParser('2 Bytes') // 2
fileSizeParser('2.23 KB') // 2283.52
fileSizeParser('1.22 MB') // 1279262.72
fileSizeParser('4.25GB') // 4563402752
fileSizeParser('1.5TB') // 1649267441664

// converts bytes to human-readable files size
fileSizeParser(2) // 2 Bytes
fileSizeParser(2283.52) // 2.23 KB
fileSizeParser(1279262.72) // 1.22 MB
fileSizeParser(4563402752) // 4.25 GB
fileSizeParser(1649267441664) // 1.5 TB

// Performs conversion with power parameters
fileSizeParser(1024) // 1 KB
fileSizeParser(2048) // 2 KB
fileSizeParser(2 ** 0) // 1 Bytes
fileSizeParser(2 ** 1) // 2 Bytes
fileSizeParser(2 ** 10) // 1 KB
fileSizeParser(2 ** 20) // 1 MB
fileSizeParser(2 ** 30) // 1 GB
fileSizeParser(2 ** 40) // 1 TB
fileSizeParser(2 ** 50) // 1 PB
fileSizeParser(2 ** 60) // 1 EB
fileSizeParser(2 ** 70) // 1 ZB
fileSizeParser(2 ** 80) // 1 YB

// Custom decimal point
fileSizeParser(2 ** 2.5, 10) // 5.6568542495 Bytes
fileSizeParser(20 ** 20, 4) // 86.7362 YB

```

**[⬆ back to top](#table-of-contents)**

## Number separator by comma

```js
const numberSeparatorByComma = (Number) => {
    Number += ''
    Number = Number.replace(',', '')
    Number = Number.replace(',', '')
    Number = Number.replace(',', '')
    Number = Number.replace(',', '')
    Number = Number.replace(',', '')
    Number = Number.replace(',', '')
    let x = Number.split('.')
    let y = x[0]
    let z = x.length > 1 ? '.' + x[1] : ''
    let rgx = /(\d+)(\d{3})/
    while (rgx.test(y)) y = y.replace(rgx, '$1' + ',' + '$2')
    return y + z
}

numberSeparatorByComma(0)          // '0'
numberSeparatorByComma(100)        // '100'
numberSeparatorByComma(1000)       // '1,000'
numberSeparatorByComma(10000.5)    // '10,000.5'
numberSeparatorByComma(100000.25)  // '100,000.25'
numberSeparatorByComma(1000000)    // '1,000,000'
numberSeparatorByComma(10000000)   // '10,000,000'
numberSeparatorByComma(100000000)  // '100,000,000'

// or

const numberSeparatorByComma = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

numberSeparatorByComma(0)          // '0'
numberSeparatorByComma(100)        // '100'
numberSeparatorByComma(1000)       // '1,000'
numberSeparatorByComma(10000.5)    // '10,000.5'
numberSeparatorByComma(100000.25)  // '100,000.25'
numberSeparatorByComma(1000000)    // '1,000,000'
numberSeparatorByComma(10000000)   // '10,000,000'
numberSeparatorByComma(100000000)  // '100,000,000'

// or 

const number = 10000000.25
console.log(number.toLocaleString()) // 10,000,000.25
```

**[⬆ back to top](#table-of-contents)**

## Convert enter (\n) characters to lists

```js
const convertEnterToList = (text) => {
    if (text.match(/\n/) && !text.includes('<ul')) {
        let listText = text.split('\n')
        let list = ''

        for (let i = 0; i < listText.length; i++) {
            if (listText[i] != '') {
                list += `<li>${listText[i]}</li>`
            }
        }
        return `<ul>${list}</ul>`
    } else {
        return `<span>${text}</span>`
    }
}

convertEnterToList('High quality\nThe best\nAwesome\nWonderful') // Result
/*
    <ul>
        <li>High quality</li>
        <li>The best</li>
        <li>Awesome</li>
        <li>Wonderful</li>
    </ul>
*/

```

**[⬆ back to top](#table-of-contents)**

## Timer

```js
const timer = (duration) => {
    let timer = parseInt(duration)
    let minutes, seconds

    let interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)

        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds

        console.log(minutes + ':' + seconds)

        if (--timer < 0) {
            timer = 0
            clearInterval(interval)
        }
    }, 1000)
}

// Duration per second
timer(5) // Result
/*
* 00:05
* 00:04
* 00:03
* 00:02
* 00:01
* 00:00
*/
```

**[⬆ back to top](#table-of-contents)**

## Timer by units

```js
let interval

const showTime = (value, unit) => {
    if (value > 1) console.log(`${value} ${unit}s`)
    else console.log(`${value} ${unit}`)
}

const timerByUnits = () => {
    let counter = 1,
        second = 1,
        minute = 0,
        hour = 0,
        day = 0,
        week = 0,
        month = 0,
        year = 0,
        unit = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year']
    // unit = ['ثانیه', 'دقیقه', 'ساعت', 'روز', 'هفته', 'ماه', 'سال']

    // Reset Timer
    clearInterval(interval)
    showTime(1, unit[0])

    interval = setInterval(() => {
        counter++
        second = Math.floor(counter / 60)
        minute = Math.floor(counter / 60)
        hour = Math.floor(minute / 60)
        day = Math.floor(hour / 24)
        week = Math.floor(day / 7)
        month = Math.floor(week / 4)
        year = Math.floor(month / 12)

        if (second <= 0) {
            showTime(counter, unit[0])

        } else if (minute >= 1 && minute < 60) {
            showTime(minute, unit[1])

        } else if (hour >= 1 && hour < 24) {
            showTime(hour, unit[2])

        } else if (day >= 1 && day < 7) {
            showTime(day, unit[3])

        } else if (week >= 1 && week < 4) {
            showTime(week, unit[4])

        } else if (month >= 1 && month < 12) {
            showTime(month, unit[5])

        } else if (year >= 1) {
            showTime(year, unit[6])
        }
    }, 1000)
}

timerByUnits() // Result
/*
* 1 second
* 2 seconds
* ...
* 1 minute
* 2 minutes
* ...
* 1 hour
* 2 hours
* ...
* 1 day
* 2 days
* ...
* 1 week
* 2 weeks
* ...
* 1 month
* 2 months
* ...
* 1 year
* 2 years
* ...
*/
```

**[⬆ back to top](#table-of-contents)**

## Find the day of the year

```js
const getDayOfYear = (date) => {
    return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
}

getDayOfYear(new Date('2022-02-02')) // 33
getDayOfYear(new Date('2001-10-26')) // 299
getDayOfYear(new Date('2022-12-31')) // 365

```

**[⬆ back to top](#table-of-contents)**

## Date validity test

```js
const isDateValid = (...value) => !Number.isNaN(new Date(...value).valueOf())

isDateValid("Wed Feb 02 2022 09:49:38") // true
isDateValid("Wed Fd 02 2022 09:49:38") // false
```

**[⬆ back to top](#table-of-contents)**

## Find the number of days between two dates

```js
const getDayDifference = (date1, date2) => {
    return Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)
}

getDayDifference(new Date("2001-10-26"), new Date("2022-10-26")) // 7670
getDayDifference(new Date("2022-1-1"), new Date("2022-2-1")) // 31
```

**[⬆ back to top](#table-of-contents)**

## Unix time

```js
// Get unix time
const getUnixTime = (date) => {
    if (date)
        return Math.floor(date / 1000.0)
    else
        return Math.floor(Date.now() / 1000.0)
}

getUnixTime(new Date("2022-1-1")) // 1640982600
getUnixTime(new Date.now()) // 1646319520
getUnixTime() // 1646319559


// Unix time to date 
const unixTimeToDate = (unix_time) => {
    return new Date(Math.floor(unix_time * 1000))
}

unixTimeToDate(1646319559) // Thu Mar 03 2022 18:29:19 GMT+0330 (Iran Standard Time)
```

**[⬆ back to top](#table-of-contents)**

## The average of numbers calculation

```js
const average = (...args) => (args.reduce((a, b) => a + b) / args.length).toFixed(2)

average(15, 20, 18, 10, 12) // '15.00'
```

**[⬆ back to top](#table-of-contents)**

## Get selected text

```js
const getSelectedText = () => window.getSelection().toString()

getSelectedText() // 'Selected text'
```

**[⬆ back to top](#table-of-contents)**

## Is prime numbers

```js
const showPrimes = (limit) => {
    for (let number = 2; number <= limit; number++)
        if (isPrime(number)) console.log(number)
}

const isPrime = (number) => {
    for (let factor = 2; factor < number; factor++)
        if (number % factor === 0) return false
    return true
}

showPrimes(10) // 2, 3, 5, 7
```

**[⬆ back to top](#table-of-contents)**

## Reverse string

```js
let str = 'Masoud'

let chars = str.split('').reverse().join('').toLowerCase()
// or
let chars = [...str].reverse().join('').toLowerCase()

console.log(chars) // duosam
```

**[⬆ back to top](#table-of-contents)**

## Random HEX code generation

```js
const randomHEXCode = () => `#${Math.floor(Math.random() * 0xfffffff).toString(16).padEnd(6, '0')}`

randomHEXCode() // #...
```

**[⬆ back to top](#table-of-contents)**

## Random PIN generator (Personal Identification Number)

```js
const randomPinNumber = length => {
    let pin = ''

    for (let i = 0; i < length; i++) {
        pin += Math.floor(Math.random() * 10)
    }

    return Number(pin)
}

randomPinNumber(6) // 685837
```

**[⬆ back to top](#table-of-contents)**

## Random number generate between maximum and minimum

```js
const randomNumber = ({max, min}) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

randomNumber({max: 999, min: 99}) // 474
```

**[⬆ back to top](#table-of-contents)**

## Copy to clipboard

```js
const copyToClipboard = (text) => {
    let elem = document.createElement('textarea')
    elem.textContent = text
    document.body.append(elem)
    elem.select()
    document.execCommand('copy')
    elem.remove()
    console.log(`\"${text}\" successfully copied`)
}

copyToClipboard('Copy me') // "Copy me" successfully copied
```

**[⬆ back to top](#table-of-contents)**

## Limit string to character

```js
const limitStringToCharacter = ({str, limit = 20}) => {
    if (str.length >= limit) return str.substring(0, limit) + '...'
    return str
}

limitStringToCharacter({str: "Hi ther I'm Masoud Karimi", limit: 15}) // "Hi ther I'm Mas..."
```

**[⬆ back to top](#table-of-contents)**

