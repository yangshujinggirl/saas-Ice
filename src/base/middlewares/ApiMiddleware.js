/**
 * 请求开始的通知
 */
function fetchStart(type, payload) {
    return Object.assign({}, payload, {
        type,
        time: Date.now()
    })
}


/**
 * 请求成功的通知
 * @param data 成功后的数据
 */
function fetchSuccess(type, payload, data) {
    return Object.assign({}, payload, {
        type,
        data,
        time: Date.now()
    })
}

/**
 * 请求失败后的通知
 * @param error 异常信息
 */
function fetchFailed(type, payload, error) {
    return Object.assign({}, payload, {
        type,
        error,
        time: Date.now()
    })
}


function ApiMiddleware({ dispatch, getState }) {
    return function(next) {
        return function(action) {
            const {
                types,
                callAPI,
                shouldCallAPI = () => true,
                payload = {}
            } = action;

            if (!types) {
                // 普通 action：传递
                return next(action);
            }

            if (!Array.isArray(types) ||
                types.length !== 3 ||
                !types.every(type => typeof type === 'string')
            ) {
                throw new Error('Expected an array of three string types.');
            }

            if (typeof callAPI !== 'function') {
                throw new Error('Expected fetch to be a function.');
            }

            if (!shouldCallAPI(getState())) {
                return;
            }

            const [requestType, successType, failureType] = types;

            dispatch(fetchStart(requestType, payload));

            return callAPI().then((data) => {
                dispatch(fetchSuccess(successType, payload, data.body))
            }).catch((ex) => {
                dispatch(fetchFailed(failureType, payload, ex))
            })
        };
    };
}

export default ApiMiddleware;
