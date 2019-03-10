import { Component, State, Event, EventEmitter } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'uc-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true
})
export class StockFinder {

  stockNameInput: HTMLInputElement;

  @State() searchResults: { symbol: string, name: string }[] = [];
  @State() loading: boolean = false;

  // event que le component emet (sera ecouté ou pas par un autre ....)
  @Event({ bubbles: true, composed: true}) ucSymbolSelected: EventEmitter<string>;

  onFindStocks(event: Event) {
    event.preventDefault();

    this.loading = true;
    const stockName = this.stockNameInput.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
    .then(res => res.json())
    .then(json => {
      this.searchResults = json['bestMatches'].map(match => {
        return { symbol: match['1. symbol'], name: match['2. name'] };
      });
      this.loading = false;
    })
    .catch(err => {
      console.log(err);
      this.loading = false;
    });
  }

  onSelectSymbol(symbol: string) {
    this.ucSymbolSelected.emit(symbol);
  }

  render() {
    let content = <ul>
                    {this.searchResults.map(result =>
                      <li onClick={this.onSelectSymbol.bind(this, result.symbol)}><strong>{result.symbol}</strong> - {result.name}</li>
                    )}
                  </ul>;
    if(this.loading) {
      content = <uc-spinner />;
    }
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <input
          ref={el => this.stockNameInput = el}
          />
        <button type="submit">Chercher</button>
      </form>,
      content
    ];
  }
}
