const crypto = require('crypto');

const encriptar = (password) => {
	let password_hash = crypto.createHash('sha256').update(password).digest('hex');
	return password_hash;
};

const desencriptar = (password, passwordhash) => {
	let new_password_hash = crypto.createHash('sha256').update(password).digest('hex');
	if (new_password_hash === passwordhash) {
		return true;
	}
	return false;
};

module.exports = {
	encriptar,
	desencriptar
};