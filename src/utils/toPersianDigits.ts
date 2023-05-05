export const toPersianDigits = (requestDigits : string) => {
	const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹']
	return requestDigits !== undefined ? requestDigits.toString().replace(/\d/g , (e) => persianDigits[parseInt(e)]) : ""
}
