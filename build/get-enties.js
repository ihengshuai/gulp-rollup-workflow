import path from "path"
import glob from "glob"

const resolve = (filePath, ...paths) => {
	return path.resolve(__dirname, filePath, ...paths)
}

function getEntry(entryPath) {
	const fileNameReg = /[^/|^\\]+(\\|\/)index$/g
	let entry = new Map()
	glob.sync(resolve(entryPath)).forEach(filePath => {
		let fileFolder = filePath.match(/\/ts\/(.+)\/*.ts/)[1].match(fileNameReg)
		if (fileFolder === null || fileFolder === void 0) {
			entry.set("index", "index")
		}
		else {
			if(fileFolder.indexOf("/")) {
				entry.set(fileFolder[0].slice(0, fileFolder[0].indexOf("/")), fileFolder[0])
			} else {
				entry.set(fileFolder[0].slice(0, fileFolder[0].indexOf("\\")), fileFolder[0])
			}
		}
	})
	return entry
}

export default getEntry
