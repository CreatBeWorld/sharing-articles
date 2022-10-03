const APIModules = import.meta.globEager('./*.js')
let module = {}
for(const key in APIModules){
	for(const m in APIModules[key]){
		module[m] = APIModules[key][m]
	}
}
export default module
