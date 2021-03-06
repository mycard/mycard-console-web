import {create} from '../services/Apps'
import {message} from 'antd'

export default {
  namespace: 'App',
  state: {
    isSubmit: false,
    isCreate: false,
    id: null,
    name: null,
    locale: null
  },
  reducers: {
    onCreate(state, action) {
      return {
        ...state,
        isCreate: true
      }
    },
    SubmitRequest(state, action) {
      return {
        ...state,
        ...action.payload,
        isSubmit: true,
      }
    },
    onCancel(state, action) {
      return {
        ...state,
        isCreate: false,
        isSubmit: false
      }
    },
    reset(state, action) {
      return {
        ...state,
        isSubmit: false,
        isCreate: false,
        id: null,
        name: null,
        locale: null
      }
    }
  },
  effects: {
    *create({payload}, {call, put, select}){
      yield put({type: 'SubmitRequest', payload})

      const {user} = yield select(state => state.user)

      const params = {
        id: payload.id,
        name: {
          [payload.locale]: payload.name
        },
        author: user.id,
      }

      try {
        const {data} = yield call(create, params)
        if (data) {
          yield put({type: 'SubmitSuccess'})
          yield put({type: 'reset'})
          yield put({type: 'Apps/fetch'})
          message.info("i18n 创建成功")
        }
      } catch (error) {
        message.error(error.message)
      }
    }
  },
  subscriptions: {},
};
