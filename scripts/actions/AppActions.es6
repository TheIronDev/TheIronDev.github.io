/**
 * This is a ActionList used in the Flux paradigm.
 *
 * The appAction's responsibility is:
 *  * Bind functions to AppDispatcher.dispatch calls
 */

import AppDispatcher from '../AppDispatcher.es6';
import AppConstants from '../AppConstants.es6';

module.exports = {
	changePage(data) {
		AppDispatcher.dispatch({
			type: AppConstants.CHANGE_PAGE,
			data: data
		});
	}
};