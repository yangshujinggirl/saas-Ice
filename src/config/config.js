/**
 * 这里定义依据运行时环境不同配置不同的配置
 * @type {Object}
 */
const RUNTIME_CONFIG = {
  "DEV": {
    "PC_DEEPSTREAM_HOST": "wss://deepstream-staging.pingchang666.com"
  },
  "FT1": {
    "PC_DEEPSTREAM_HOST": "wss://deepstream-staging.pingchang666.com"
  },
  "FT2": {
    "PC_DEEPSTREAM_HOST": "wss://deepstream-staging.pingchang666.com"
  },
  "FT3": {
    "PC_DEEPSTREAM_HOST": "wss://deepstream-staging.pingchang666.com"
  },
  "STAGING": {
    "PC_DEEPSTREAM_HOST": "wss://deepstream-staging.pingchang666.com"
  },
  "PRO": {
    "PC_DEEPSTREAM_HOST": "wss://deepstream.pingchang666.com"
  }
}

export default RUNTIME_CONFIG