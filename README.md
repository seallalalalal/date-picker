This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- development build:

```bash
npm install
npm run dev
```

- production build:

```bash
npm install
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Demo

- [Vide Demo here](https://date-picker-eosin.vercel.app/)

### Shared DatePicker Props

| Property Name                | Type                | Default Value   |
| ---------------------------- | ------------------- | --------------- |
| startDate                    | Moment \| undefined | required        |
| endDate                      | Moment \| undefined | required        |
| className                    | string              | undefined       |
| disabledOnClickNextMonth     | boolean             | false           |
| disabledOnClickPreviousMonth | boolean             | false           |
| disabledTodayAfter           | boolean             | false           |
| dayRenderer                  | Function            | undefined       |
| headerRenderer               | Function            | undefined       |
| monthFormat                  | string              | "YYYY 年 MM 月" |
| dayFormat                    | string              | "D 日"          |
| defaultHightlightToday       | boolean             | true            |
| showDaysOfWeek               | boolean             | true            |

### Single DatePicker Props

| Property Name | Type                                | Default Value |
| ------------- | ----------------------------------- | ------------- |
| mode          | "single"                            | required      |
| onChange      | (date: Moment \| undefined) => void | required      |

### Range DatePicker Props

| Property Name | Type                                                                   | Default Value |
| ------------- | ---------------------------------------------------------------------- | ------------- |
| mode          | "range"                                                                | required      |
| onChange      | (startDate: Moment \| undefined, endDate: Moment \| undefined) => void | required      |
