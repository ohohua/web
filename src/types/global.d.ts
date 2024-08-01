declare global {
  // 定义请求响应参数
  interface Result<T> {
    code: number
    msg: string
    data: T
  }

  interface ListDto {
    pageNo: number
    pageSize: number
    [props: string]: string | number
  }

  interface ListTime {
    createTime: Date
    updateTime: Date
  }
}
// 为了让document使用startViewTransition方法
interface Document {
  startViewTransition?: (callback: () => void) => ViewTransition
}

interface ViewTransition {
  ready: Promise<void>
  updateCallbackDone: Promise<void>
  finished: Promise<void>
}

export {}
