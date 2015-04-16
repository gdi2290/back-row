/// <reference path='../flux/flux.d.ts' />
/// <reference path='../react/react.d.ts' />

declare module 'marty' {
  import Flux = require('flux');
  import React = require('react');

  module Marty {
    interface Map<T> {
      [name: string]: T
    }

    interface FetchOptions<T> {
       id: string;
       locally: () => T;
       remotely?: () => Promise<T>;
       dependsOn?: FetchResult<T> | Array<FetchResult<T>>;
       cacheError?: boolean;
    }

    interface WhenHandlers<T> {
      done(result: T): any;
      failed(error: any): any;
      pending(): any;
    }

    interface When<T> {
      (handlers: WhenHandlers<T>, context?: any): void;
      all(fetchResult: FetchResult<any>[], handlers: WhenHandlers<Array<any>>, context?: any): void;
      toPromise(): Promise<T>;
    }

    interface FetchResult<T> {
      status: string;
      failed: boolean;
      error?: any;
      result?: T;
      done: boolean;
      when: When<T>;
    }

    interface Fetch {
      <T>(options: FetchOptions<T>): FetchResult<T>;
      <T>(id: string, local: () => T, remote?: () => Promise<T>): FetchResult<T>;

      done<T>(result: T, id: string, store: Store<any>): FetchResult<T>;
      pending(id: string, store: Store<any>): FetchResult<any>;
      failed(error: any, id: string, store: Store<any>): FetchResult<any>;
      notFound(id: string, store: Store<any>): FetchResult<any>;
    }

    class Store<S> {
      id: string;
      state: S;
      handlers: any;
      displayName: string;
      dispatchToken: string;

      constructor(options: any);
      setState(nextState: S): void;
      replaceState(nextState: S): void;
      addChangeListener(callback: (state: S, store: Store<S>) => any, context: any): void;
      hasChanged(): void;
      fetch: Fetch;
      for(obj: any): any;
      hasAlreadyFetched(id: string): boolean;
      waitFor(stores: Array<Store<any>>): void;
    }

    class DispatchCoordinator {
      id: string;
      displayName: string;

      dispatch(type: string, ...data: any[]): void;
    }

    class ActionCreators extends DispatchCoordinator {
      for(obj: any): ActionCreators;
    }

    class Queries extends DispatchCoordinator {
      for(obj: any): Queries;
    }

    type ContainerConfigFetch = Map<Function> | (() => Map<Function>);

    interface ContainerConfig {
      listenTo: Store<any> | Array<Store<any>>;
      fetch?: ContainerConfigFetch;
      done?: (props: any) => React.ReactElement<any>;
      pending?: () => React.ReactElement<any>;
      failed?: (errors: any[]) => React.ReactElement<any>;
    }

    function createContainer(component: React.ComponentClass<any>, config: ContainerConfig): React.ClassicComponentClass<{}>;

    interface StateMixinOptions {
      listenTo: Store<any> | Array<Store<any>>
      getState?: () => any;
      contextTypes?: React.ValidationMap<any>;
      [key: string]: any;
    }

    interface StateMixin {
      contextTypes: {
        marty: typeof React.PropTypes.object
      };
      componentDidMount(): void;
      onStoreChanged(): void;
      componentWillUnmount(): void;
      componentWillReceiveProps(nextProps: any): void;
      getState(): any;
      getInitialState(): any;
    }

    function createStateMixin(options: Store<any> | StateMixinOptions): StateMixin;

    class StateSource {
      id: string;
      type: string;
      mixins: Array<any>;
    }

    class CookieStateSource extends StateSource {
      get(key: string): any;
      set(key: string, value: any): boolean;
      expire(key: string): boolean;
    }

    interface RequestOptions {
      url: string;
      method?: string;
      headers?: Map<string>;
      body?: string | Object;
      contentType?: string;
      dataType?: string;
    }

    interface HttpFetch {
      text(): Promise<string>;
      json(): Promise<string>;
      headers: {
        get(key: string): string;
      }
      status: number;
      statusText: string;
    }

    interface HookOptions {
      id: string;
      priority?: number;
      before?: (req: any) => any;
      after?: (res: any) => any;
    }

    class HttpStateSource extends StateSource {
      baseUrl: string;
      request(options: RequestOptions): Promise<HttpFetch>;
      get(url: string): Promise<HttpFetch>;
      get(options: RequestOptions): Promise<HttpFetch>;
      post(url: string): Promise<HttpFetch>;
      post(options: RequestOptions): Promise<HttpFetch>;
      put(url: string): Promise<HttpFetch>;
      put(options: RequestOptions): Promise<HttpFetch>;
      delete(url: string): Promise<HttpFetch>;
      delete(options: RequestOptions): Promise<HttpFetch>;

      static addHook(options: HookOptions): void;
      static removeHook(options: HookOptions): void;
    }

    class JSONStorageStateSource extends StateSource {
      storage: any;
      namespace: string;

      get(key: string): any;
      set(key: string, value: any): void;
    }

    class LocalStorageStateSource extends JSONStorageStateSource {}

    class SessionStorageStateSource extends JSONStorageStateSource {}

    interface LocationInformation {
      url: string;
      path: string;
      hostname: string;
      query: Map<string>;
      protocol: string;
    }

    class LocationStateSource extends StateSource {
      getLocation(): LocationInformation
    }

    interface ContextFetchOptions {
      timeout?: number;
    }

    interface Context {
      fetch(callback: () => any, options?: ContextFetchOptions): Promise<any>;
      resolve(obj: any): any;
      getAll(type: string): any[];
    }

    function createContext(): Context;

    function register<T>(clazz: { new (...args: any[]): T }): T;

    function get(type: string, id: string): any;

    function getAll(type: string): any[];

    function getDefault(type: string, id: string): any;

    function getAllDefaults(type: string): any[];

    function resolve(type: string, id: string, options?: Object): any;

    interface Dispatcher {
      getDefault(): Flux.Dispatcher<any>;
      dispatchAction(options: Object): any;
      onActionDispatched(callback: (action: any) => any, context?: any): void;
    }

    var dispatcher: Dispatcher;

    interface ConstantsOption {
      [key: string]: string[] | ConstantsOption;
    }

    function createConstants(constants: string[]): any;
    function createConstants(constants: ConstantsOption): any;

    function replaceState(stores: { [name: string]: { state: any } }, context?: any): void;

    function clearState(context?: any): void;

    function dehydrate(context?: any): void;

    function rehydrate(stores?: any, context?: any): void;

    interface RenderToStringOptions {
      type: React.ComponentClass<any>;
      timeout?: number;
      props?: any;
      context?: any;
    }

    function renderToString(options: RenderToStringOptions): Promise<{ html: string}>;

    interface Warnings {
      without(warningsToDisable: string[], callback: () => any, context?: any): void;
      invokeConstant: boolean;
      reservedFunction: boolean;
      cannotFindContext: boolean;
      classDoesNotHaveAnId: boolean;
      stateIsNullOrUndefined: boolean;
      callingResolverOnServer: boolean;
      stateSourceAlreadyExists: boolean;
      superNotCalledWithOptions: boolean;
      promiseNotReturnedFromRemotely: boolean;
      contextNotPassedInToConstructor: boolean;
    }

    var warnings: Warnings;

    function createInstance(): typeof Marty;

    function dispose(): void;

    var version: string;

    var isServer: boolean;

    var isBrowser: boolean;
  }

  import M = Marty;

  export = M;
}
