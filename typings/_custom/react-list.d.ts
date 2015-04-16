/// <reference path='../react/react.d.ts' />

declare module 'react-list' {
  import React = require('react')

  interface ListProps {
    itemRenderer?(index: number, key: number): React.ReactElement<any>;
    itemsRenderer?(items: any[], ref: string): React.ReactElement<any>;
    length?: number;
    pageSize?: number;
    threshold?: number;
  }

  interface ListState {
    from: number;
    size: number;
  }

  export class List extends React.Component<ListProps, ListState> {
    componentWillReceiveProps(next: any): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    getScrollParent(): HTMLElement;
    getScroll(): number;
    getViewportHeight(): number;
    updateFrame(): void;
    render(): React.ReactElement<any>;
    shouldComponentUpdate(): any;
  }

  interface UniformListProps {
    itemRenderer?(index: number, key: () => number): React.ReactElement<any>;
    itemsRenderer?(items: any[], ref: string): React.ReactElement<any>;
    length?: number;
  }

  interface UniformListState {
    columns: number;
    from: number;
    itemHeight: number;
    size: number;
  }

  export class UniformList extends React.Component<UniformListProps, UniformListState> {
    componentWillReceiveProps(next: any): void;
    setScroll(y: number): void;
    scrollTo(i: number): void;
    updateFrame(): void;
    getMaxFrom(length: number, columns: number): number;
    getSpace(n: number): number;
    render(): React.ReactElement<any>;
  }
}
