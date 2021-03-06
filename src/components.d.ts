/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface MyComponent {
    /**
    * The first name
    */
    'first': string;
    /**
    * The last name
    */
    'last': string;
    /**
    * The middle name
    */
    'middle': string;
  }
  interface MyComponentAttributes extends StencilHTMLAttributes {
    /**
    * The first name
    */
    'first'?: string;
    /**
    * The last name
    */
    'last'?: string;
    /**
    * The middle name
    */
    'middle'?: string;
  }

  interface UcSideDrawer {
    'open': () => void;
    'opened': boolean;
    'title': string;
  }
  interface UcSideDrawerAttributes extends StencilHTMLAttributes {
    'opened'?: boolean;
    'title'?: string;
  }

  interface UcSpinner {}
  interface UcSpinnerAttributes extends StencilHTMLAttributes {}

  interface UcStockFinder {}
  interface UcStockFinderAttributes extends StencilHTMLAttributes {
    'onUcSymbolSelected'?: (event: CustomEvent<string>) => void;
  }

  interface UcStockPrice {
    'stockSymbol': string;
  }
  interface UcStockPriceAttributes extends StencilHTMLAttributes {
    'stockSymbol'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'MyComponent': Components.MyComponent;
    'UcSideDrawer': Components.UcSideDrawer;
    'UcSpinner': Components.UcSpinner;
    'UcStockFinder': Components.UcStockFinder;
    'UcStockPrice': Components.UcStockPrice;
  }

  interface StencilIntrinsicElements {
    'my-component': Components.MyComponentAttributes;
    'uc-side-drawer': Components.UcSideDrawerAttributes;
    'uc-spinner': Components.UcSpinnerAttributes;
    'uc-stock-finder': Components.UcStockFinderAttributes;
    'uc-stock-price': Components.UcStockPriceAttributes;
  }


  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };

  interface HTMLUcSideDrawerElement extends Components.UcSideDrawer, HTMLStencilElement {}
  var HTMLUcSideDrawerElement: {
    prototype: HTMLUcSideDrawerElement;
    new (): HTMLUcSideDrawerElement;
  };

  interface HTMLUcSpinnerElement extends Components.UcSpinner, HTMLStencilElement {}
  var HTMLUcSpinnerElement: {
    prototype: HTMLUcSpinnerElement;
    new (): HTMLUcSpinnerElement;
  };

  interface HTMLUcStockFinderElement extends Components.UcStockFinder, HTMLStencilElement {}
  var HTMLUcStockFinderElement: {
    prototype: HTMLUcStockFinderElement;
    new (): HTMLUcStockFinderElement;
  };

  interface HTMLUcStockPriceElement extends Components.UcStockPrice, HTMLStencilElement {}
  var HTMLUcStockPriceElement: {
    prototype: HTMLUcStockPriceElement;
    new (): HTMLUcStockPriceElement;
  };

  interface HTMLElementTagNameMap {
    'my-component': HTMLMyComponentElement
    'uc-side-drawer': HTMLUcSideDrawerElement
    'uc-spinner': HTMLUcSpinnerElement
    'uc-stock-finder': HTMLUcStockFinderElement
    'uc-stock-price': HTMLUcStockPriceElement
  }

  interface ElementTagNameMap {
    'my-component': HTMLMyComponentElement;
    'uc-side-drawer': HTMLUcSideDrawerElement;
    'uc-spinner': HTMLUcSpinnerElement;
    'uc-stock-finder': HTMLUcStockFinderElement;
    'uc-stock-price': HTMLUcStockPriceElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
