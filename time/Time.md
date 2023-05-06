<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [Conditioned time formatting.](#conditioned-time-formatting)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Creates an unstyled HTML `time` tag for a given `Date` object.
The Time component uses date-fns library for formatting.
Look [here](https://date-fns.org/v1.29.0/docs/format) for formatting documentation.

```jsx
<Time time={new Date()} format="dd.MM.yyyy HH:mm" />
```

### Conditioned time formatting.

Checks the current time and prints the appropriate format
according to the format conditions.

Pass `DateFormatRule` array to the `format` prop.
A `DateFormatRule` is an object with the following structure:

```json
{
  "from": "-4h",
  "until": "-1h",
  "format": "dd.MM.yyyy HH:mm"
}
```

_Time in example is set to 6 hours ago._

```jsx
<Time
  time={new Date(Date.now() - 21600000)}
  format={[
    { from: '-7h', format: 'HH:mm' },
    { from: '-1d', until: '-7h', format: '[Today]' },
  ]}
/>
```
