// @ts-nocheck
const fs = require("fs")
const path = require("path")
const { series, parallel, src, dest, watch } = require("gulp")
const sassCompiler = require("gulp-sass")
const pugCompiler = require("gulp-pug")
const jsCompiler = require("gulp-babel")
const browserify = require("browserify")
const fileinclude = require("gulp-file-include")
const connect = require("gulp-connect")
const autoprefixer = require("gulp-autoprefixer")
const open = require("open")
const IP = require("./ip")()
const port = 7777


const pug = done => {
	src("../src/pages/**/*.pug")
		.pipe(pugCompiler({ pretty: true }))
		.pipe(dest("../dist"))
		.pipe(connect.reload())
	done()
}

const sass = done => {
	src("../src/sass/*.scss")
		.pipe(sassCompiler({ outputStyle: "expanded" }).on('error', sassCompiler.logError))
		.pipe(autoprefixer({
			overrideBrowserslist: [
				"Android 4.1",
				"iOS 7.1",
				"Chrome > 31",
				"ff > 31",
				"ie >= 8"
			],
			grid: true
		}))
		.pipe(dest("../dist/css"))
		.pipe(connect.reload())
	done()
}

const js = done => {
	src("../src/js/**/*.js")
		.pipe(dest("../dist/js"))
		.pipe(connect.reload())
	done()
}

const img = done => {
	src("../src/img/**")
		.pipe(dest("../dist/img"))
		.pipe(connect.reload())
	done()
}

const lib = done => {
	src("../src/lib/**")
		.pipe(dest("../dist/lib"))
		.pipe(connect.reload())
	done()
}

const favicon = done => {
	src("../*.png")
		.pipe(dest("../dist"))
		.pipe(connect.reload())
	done()
}

const webServer = done => {
	connect.server({
		livereload: true,
		host: IP,
		root: "../dist",
		port,
	})
	open(`http://${IP}:${port}`)
}

const realTimeCompiler = () => {
	watch("../src/**/*", series(parallel(pug, sass, js, img, lib, favicon)))
}

const tasks = [pug, sass, js, img, lib, favicon, webServer, realTimeCompiler]

exports.default = series(parallel(...tasks))
