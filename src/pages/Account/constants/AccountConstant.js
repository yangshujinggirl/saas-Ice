import keyMirror from 'keymirror';
import BaseConstant from '../../../base/constants/BaseConstant';

// export default Object.assign({}, BaseConstant, keyMirror({

// }));

class AccountConstant extends BaseConstant{
	constructor(){
		super();

		this.key = 'ACCOUNT_'
	}
}

export default new AccountConstant();