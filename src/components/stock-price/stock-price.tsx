import { Component, State, Element, Prop, Watch, Listen } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';
import { ListFormat } from "typescript";

@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {

  stockInput: HTMLInputElement;
  initialStockSymbol: string;

  // Reference au web component
  @Element() el: HTMLElement;

  @State() fetchPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid: boolean = false;
  @State() error: string;

  @State() loading = true;

  // From outside
  @Prop({ mutable: true, reflectToAttr: true}) stockSymbol: string;

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if(newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }

  // Permt le 2 way binding avec value et onInput sur l'element
  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    if(this.stockUserInput.trim() !== '') {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault(); // evite le submit par le browser

    //const symbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    this.stockSymbol = this.stockInput.value;
    //this.fetchStockPrice(symbol);
  }

  // Lifecycle : avnt render(), on peut changer des valeurs
  componentWillLoad() {
    //console.log('componentWillLoad');
    //console.log(this.stockSymbol);
  }

  // Lifecycle : apres render, si on change des values -> render() se re-execute -> pb
  componentDidLoad() {
    //console.log('componentDidLoad');
    if(this.stockSymbol) {
      this.initialStockSymbol = this.stockSymbol;
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  //Lifecycle : juste avant render() si prop ou state ont changé
  componentWillUpdate() {
    //console.log('componentWillUpdate');
  }

  //Lifecycle : juste après render()
  componentDidUpdate() {
    //console.log('componentDidUpdate');
    //if(this.stockSymbol !== this.initialStockSymbol) {
     // this.initialStockSymbol = this.stockSymbol;
     // this.fetchStockPrice(this.stockSymbol);
    //}
  }

  //Lifecycle : apres que le component a été remové du Dom : ici on fait le clean-up
  componentDidUnload() {
    //console.log('componentDidUnload');
  }

  // Liste ecoute par defaut des events emit depuis render. body: ecoute globalement
  @Listen('body:ucSymbolSelected')
  onStockSymbolSelected(event: CustomEvent) {
    if(event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail; // sera refectché car watch sur stockSymbol
    }
  }

  fetchStockPrice(symbol: string) {
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${AV_API_KEY}`)
    .then(res => {
      if(res.status !== 200) {
        throw new Error('Invalid');
      }
      return res.json();
    })
    .then(json => {
      console.log(json);
      if(!json['Global Quote']['05. price']) {
        throw new Error('Invalid symbol!');
      }
      this.error = null; // reset

      // + pour convertir en number
      this.fetchPrice = +json['Global Quote']['05. price'];
      this.loading = false;
    })
    .catch(err => {
      this.error = err.message;
      this.fetchPrice = null;
      this.loading = false;
    });
  }

  hostData() {
    return { class: this.error ? 'error' : '' };
  }

  render() {
    let dataContent = <p>Entrer une action</p>;
    if(this.error) {
      dataContent = <p>{this.error}</p>
    }
    if(this.fetchPrice) {
      dataContent = <p>Price: {this.fetchPrice} $</p>;
    }
    if(this.loading) {
      dataContent = <uc-spinner></uc-spinner>;
    }
    return[
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input
          id="stock-symbol"
          ref={el => this.stockInput = el}
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)}
          />
        <button type="submit" disabled={!this.stockInputValid || this.loading}>Fetch</button>
      </form>,
      <div>
        {dataContent}
      </div>
    ];
  }
}
