export default function extMoodleText(text: string, lang: string, fallback: undefined | string = undefined) {
    let startKey = `{mlang ${lang}}`
    let endKey = "{mlang}"
    let start = text.indexOf(startKey) + startKey.length
    let end = text.indexOf(endKey, start)
    if (start < startKey.length || end == -1) {
        return fallback ?? ""
    }
    return text.substring(start, end)
}