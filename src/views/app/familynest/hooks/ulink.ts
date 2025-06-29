/**
 * Ulink配置
 */
interface LinkConfig {
  id: string; // 必填参数,后台生成的linkid
  data?: object; // 自定义参数例如{a:1,b:2} 换起应用时会携带过去并映射成a=1&b=2
}
/**
 * 配置下发回调
 */
type ReadyCallback = {
  (ctx: LinkInstance): void;
};
/**
 * 配置下发内容
 */
interface ISolutions {
  wakeupUrl: string; // 唤起地址
  type: "scheme" | "universalLink"; // 唤起类型
  downloadUrl: string; // 下载地址
  appkey: string; // 对应appkey
  clipboardToken?: string; // 友盟后台开启剪切板能力时返回此字段，开启后可提高带参安装匹配成功率。
}
interface IWakeup {
  action?: "" | "load" | "click"; // 设置统计上报的唤起方式
  proxyOpenDownload?: IProxyOpenDownload; // 代理打开下载提示行为
  beforeOpenDownload?: ICallback;
  afterOpenDownload?: ICallback;
  timeout?: number; //触发弹窗等待超时时间单位毫秒，默认200毫秒，安卓中微信强制为0
}
type ICallback = {
  (ctx: LinkInstance): void;
};
type defaultActionCallback = {
  (extdata?: object): void;
};
type IProxyOpenDownload = {
  (defaultAction: defaultActionCallback, ctx: LinkInstance): any; // 如仍需执行默认弹窗行为可调用defaultActionCallback
};
/**
 * Ulink实例
 */
interface LinkInstance {
  ready(callback: ReadyCallback): void; // 配置下发
  wakeup(config: IWakeup): LinkInstance; // 唤起
  solution: ISolutions; // 配置下发内容
}
declare namespace ulink {
  /**
   * sdk版本
   */
  export const version: string;
  /**
   * 创建Link实例
   * @param config 实例配置
   */
  export function start(config: LinkConfig): LinkInstance;
  export interface tracker {}
}
type ProxyOpenInBrowerTips = {
  (): string;
};
type ProxyShowLoading = {
  (): void;
};
type ProxySHideLoading = {
  (): void;
};
/**
 * 自由拼接待写入剪切板内容，入参为服务端下发的token，返回值将被写入剪切板
 */
type SetClipboardText = {
  (clipboardToken: string): string;
};
type LinkOption = {
  id: string; // 必填参数,后台生成的linkid
  selector?: string; // 需要点击唤起的元素选择器（采用事件代理模式，不必等元素创建后绑定），示例 '#idxx,#idxxx',参考文档https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Locating_DOM_elements_using_selectors
  data?: object; // 自定义参数例如{a:1,b:2} 换起应用时会携带过去并映射成a=1&b=2
  proxyOpenDownload?: IProxyOpenDownload; // 自定义打开下载提示行为
  timeout?: number; // 触发弹窗等待超时时间单位毫秒，默认200毫秒，安卓中微信强制为0
  auto?: boolean; // 是否自动唤起,默认false,配置下发后不自动唤起应用(特别注意，部分web容器会限制自动唤起)
  lazy?: boolean; // 是否将配置下发延迟到点击时下发，默认false，如果需延迟到点击时下发配置应设置为true
  useOpenInBrowerTips?: string | ProxyOpenInBrowerTips; // 是否在微信和qq中使在浏览器中打开的提示，当值为string类型时，默认'default',值为function时，需要该函数返回蒙层html片段。
  useLoading?: string | [ProxyShowLoading, ProxySHideLoading]; // 即将支持 当值为string类型时，默认'default',启用自带loading,当值为数值时，数组第一个函数触发唤起时触发，第二个函数关闭loading时触发
  onready?: ReadyCallback; // 配置下发后触发
  useClipboard?: boolean | SetClipboardText; //开发者在产品后台打开剪切板功能后此功能才生效，默认 为true, true 代表在唤起时用clipboardToken覆盖剪切板内容;false代表不会覆盖剪切板内容，开发者可以在onready后获取配置下发的token;如果是一个function，则将function返回的string写到剪切板，function的入参是配置下发的clipboardToken，当且仅当开发者需要自定义剪切板内容时使用。特别注意，若服务端剪切板功能关闭，则此配置完全失效。（2021.04.23上架生效）
};
declare class ulink {
  /**
   * ulink新版初始化函数
   * @param option 初始化参数
   */
  constructor(option: LinkOption);
  /**
   * ulink新版多参数初始化函数
   * @param options 多个linkid初始化参数
   */
  constructor(options: Array<LinkOption>);
}
// export as namespace ULink;
// export = ulink;
