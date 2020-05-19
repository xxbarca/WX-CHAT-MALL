class HttpException extends Error{
	errorCode = 9999
	statusCode = 500
	messagee = ''
	constructor(errrorCode, message, statusCode) {
		super()
		this.message = message
		this.errorCode = errrorCode
		this.statusCode = statusCode
	}
}

export {
	HttpException
}
