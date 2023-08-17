export class URLRenderer {
	init(params) {
		this.eGui = document.createElement('a')
		this.eGui.href = params.value
		this.eGui.target = '_blank'
		this.eGui.textContent = params.value.substring(params.value.indexOf('//') + 2, params.value.indexOf('.'))
	}

	getGui() {
		return this.eGui
	}

	refresh(params) {
		return false
	}
}
