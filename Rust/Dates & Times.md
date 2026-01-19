## Date Time Basics
The standard library only provides basic elapsed time.

```rust
use std::time::{Duration, Instant};

let now = Instant::now();
// some code execution
let elapsed = now.elapsed();
println!("Elapsed time: {:.2?}", elapsed);

left five_seconds = Duration::from_secs(5);
```

The community standard for date and time handling is the `chrono` crate.

> [!INFO] Khronos
> In greek mythology, Chronos (or Khronos) aka Protogenos is the personification of time. In Orphic Lineage it is said that Khronos emerged that the very beginning of the universe, Khronos along with his consort Ananke (necessity) produced Chaos, Aether (light) and Erebus (darkness). Khronos created a "World Egg" within Aether, from this egg hatched Phanes who brought forth the universe as we know it. He is often depicted as a serpentine being with 3 heads (man, bull, and lion) representing the past, present, and future. 

To use `chrono`, add it to your `Cargo.toml`:

```toml
[dependencies]
chrono = "0.4"  # Check https://crates.io/crates/chrono for the latest version
```

### The `NaiveDate` struct
The `NaiveDate` struct represents a calendar date without timezone information.

```rust
use chrono::NaiveDate;
let date = NaiveDate::from_ymd_opt(2023, 10, 5); // returns an option enum, because the values may be invalid 

// Parsing strings
let parsed_date = NaiveDate::parse::<NaiveDate>("2023-10-05").unwrap();
```

### The `TimeDelta` struct
The `TimeDelta` struct represents a duration of time.

```rust
use chrono::{NaiveDate, TimeDelta};
// using the constructor
let five_seconds = TimeDelta::seconds(5, 0); // secs, nanos

let five_minutes = TimeDelta::minutes(5); // there are hours, days, weeks etc. as well

// arithmetic operations
let total_duration = five_seconds + five_minutes;
let difference = five_minutes - five_seconds;

// adding and subtracting
use std::ops::{Add, Sub};

let birthday = NaiveDate::from_ymd_opt(1990, 1, 1).unwrap();
let next_birthday = birthday.add(TimeDelta::days(365));
```

### `NaiveTime` and `NaiveDateTime` structs
The `NaiveTime` struct represents a time of day without timezone information, while `NaiveDateTime` combines both date and time.

```rust
let four_thirty_three_pm = NaiveTime::from_hms_opt(16, 33, 0).unwrap(); // uses 24 hour format

let meeting = NaiveDateTime::new(
    NaiveDate::from_ymd_opt(2025, 10, 5).unwrap(),
    NaiveTime::from_hms_opt(14, 0, 0).unwrap(),
)
```
### Time Zones with `DateTime` struct
The `DateTime` struct represents a date and time with timezone information. You can use the `chrono-tz` crate for timezone support.

```toml
[dependencies]
chrono-tz = "0.6"  # Check https://crates.io/crates/chrono-tz for the latest version
chrono = "0.4"
```

```rust
use chrono::prelude::*;

let system_time = Local::now(); // current date and time in local timezone
let utc_time = Utc::now(); // current date and time in UTC

// extracting time and date components
println!("Year: {}", system_time.year()); // hour minute second etc. are also available
println!("Naive Date: {}", system_time.date_naive());
println!("Naive Time: {}", system_time.time());

// offset
println!("Offset from UTC: {}", system_time.offset()); // this takes into account daylight savings as well

// Converting timezones
use chrono_tz::Tz;
let new_york_time: DateTime<Tz> = system_time.with_timezone(&chrono_tz::America::New_York); // passing &Utc will convert to UTC

// parse_from_str
// there is the parse method which we already saw, but date time strings come in various formats, so we can use parse_from_str to specify the format
let independence_date_str = "15-Aug-1947 00:00:00 +0530";
let independence_date = DateTime::parse_from_str(
    independence_date_str,
    "%d-%b-%Y %H:%M:%S %z", // format string
); // returns a Result enum

// format method, essentially the reverse of parse
let formatted_date = independence_date
    .unwrap()
    .format("%Y/%m/%d %H:%M:%S %:z")
    .to_string();
```

> [!INFO] Daylight Savings Time
> Daylight Savings Time (DST) is the practice of setting the clock forward by one hour during the warmer months to extend evening daylight and setting it back again in the fall. This practice can affect time calculations, especially when dealing with time zones that observe DST. It is used primarily in NA and Europe, most countries near the equator do not use it because their daylight hours do not vary much by season.

