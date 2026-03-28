# UniCalc

Pakistan's first open-source university merit calculator. Covers 15+ universities with verified aggregate formulas for both FSc and A-Level students.

Live at [unicalc.csconnect.pk](https://unicalc.csconnect.pk)

## What it does

Students enter their matric, intermediate, and entry test marks. The calculator applies the correct official formula for the selected university and returns the aggregate. It also shows past closing merits and predicts admission chances.

Supported universities include NUST, FAST, GIKI, ITU, COMSATS, UET, NED, PIEAS, IST, NUTECH, PUCIT, PU, Air, Bahria, UHS, NUMS, IIU, and more.

## Tech stack

- Plain HTML, CSS, JavaScript. No frameworks, no build step.
- Hosted on Vercel.
- University configs, formulas, and merit data are stored in JS files under `js/`.

## Contributing

Built by [Azan](https://azanw.com) with the help of some amazing contributors. This is an open-source project and contributions are welcome.

**Merit data.** If you have verified closing merits for any university, campus, or program, open an issue or PR with the data and the source.

**Formulas.** If you know the exact aggregate formula or test pattern for a university we have not covered, share it. Include the source if possible.

**Code.** Fix bugs, improve the UI, or add features. Fork the repo, make your changes, and open a pull request. Keep changes focused and test on both desktop and mobile before submitting.

**Guidelines for PRs:**
- One change per PR. Do not bundle unrelated fixes.
- Test on mobile. Most users are on phones.
- Do not add frameworks or build tools. This project is intentionally vanilla JS.
- Keep the code simple. If three lines of code solve the problem, do not write an abstraction.

## Running locally

```
npx http-server -p 8080
```

Open `http://localhost:8080` in your browser.

## Contact

Reach out at hi@azanw.com for questions or feedback.

## License

MIT
