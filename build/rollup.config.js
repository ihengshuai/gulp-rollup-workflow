import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import TS from "rollup-plugin-typescript2"
import { uglify } from "rollup-plugin-uglify"

import getEntries from "./get-enties"
const entries = getEntries("../src/ts/**/index.ts")

const plugins = [
	TS(),
	resolve({
		extensions: ['.js', '.ts'],
	}),
	commonjs(),
	babel({
		exclude: 'node_modules/**'
	}),
	// uglify({
	// 	compress: {
	// 		pure_getters: true,
	// 		unsafe: true,
	// 		unsafe_comps: true,
	// 	}
	// }),
]
const external = ["jquery"]

const rollupOptions = []
entries.forEach((filePath, fileName) => {
	rollupOptions.push({
		input: `./src/ts/${filePath}.ts`,
		output: {
			file: `./src/js/${fileName}.js`,
			format: "iife", // umd, iife, cjs
		},
		plugins,
		external,
	})
})

export default rollupOptions
