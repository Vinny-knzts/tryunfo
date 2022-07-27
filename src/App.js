import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.buttonValiation = this.buttonValidation.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.SuperTrunfoFilter = this.SuperTrunfoFilter.bind(this);

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      savedCards: [],
      backupCard: [],
      hasTrunfo: false,
      cardNameFilter: '',
      cardRareFilter: 'todas',
      superTrunfoFilter: false,
    };
  }

  onInputChange({ target }) {
    const { name } = target;
    let { value } = target;
    if (target.type === 'checkbox') value = target.checked;
    else if (target.type === 'number') value = target.valueAsNumber;
    this.setState({ [name]: value }, () => this.buttonValidation());
  }

  onSaveButtonClick() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo, savedCards, backupCard } = this.state;
    const obj = {
      cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
    };
    savedCards.push(obj);
    backupCard.push(obj);
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
    if (cardTrunfo) this.setState({ hasTrunfo: true });
  }

  onChangeFilter({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { cardNameFilter, cardRareFilter, backupCard } = this.state;
      let newList = [];
      if (cardRareFilter === 'todas') {
        newList = backupCard.filter((card) => (
          card.cardName.includes(cardNameFilter)
        ));
        this.setState({ savedCards: newList });
      } else {
        newList = backupCard.filter((card) => (
          card.cardName.includes(cardNameFilter) && card.cardRare === cardRareFilter
        ));
      }
      this.setState({ savedCards: newList });
    });
  }

  SuperTrunfoFilter({ target }) {
    const { name, checked } = target;
    this.setState({ [name]: checked }, () => {
      if (checked === true) {
        const { backupCard } = this.state;
        const newList = backupCard.filter((card) => (
          card.cardTrunfo === true
        ));
        this.setState({ savedCards: newList });
      } else {
        const { backupCard } = this.state;
        this.setState({ savedCards: backupCard });
      }
    });
  }

  buttonValidation() {
    const { cardName, cardDescription, cardImage, cardAttr1, cardAttr2,
      cardAttr3 } = this.state;
    const singleLimit = 90;
    const maxLimit = 210;
    if (
      cardName.length === 0 || cardDescription.length === 0 || cardImage.length === 0
      || cardAttr1 < 0 || cardAttr1 > singleLimit
      || cardAttr2 < 0 || cardAttr2 > singleLimit
      || cardAttr3 < 0 || cardAttr3 > singleLimit
      || cardAttr1 + cardAttr2 + cardAttr3 > maxLimit
    ) this.setState({ isSaveButtonDisabled: true });
    else this.setState({ isSaveButtonDisabled: false });
  }

  removeCard({ target }) {
    const { savedCards, backupCard } = this.state;
    const children = target.parentElement.children.length;
    const TrunfoChildren = 9;
    const newList = savedCards.filter((card) => (
      card.cardName !== target.parentElement.firstChild.innerHTML
    ));
    const newBackupList = backupCard.filter((card) => (
      card.cardName !== target.parentElement.firstChild.innerHTML
    ));
    this.setState({
      savedCards: newList,
      backupCard: newBackupList,
    });
    if (children === TrunfoChildren) this.setState({ hasTrunfo: false });
  }

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo, isSaveButtonDisabled, hasTrunfo, savedCards,
      cardNameFilter, cardRareFilter, superTrunfoFilter } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
          hasTrunfo={ hasTrunfo }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          onInputChange={ this.onInputChange }
          cardRemove={ false }
        />
        <h3>Deck:</h3>
        <label htmlFor="cardNameFilter">
          Filtrar por Nome:
          <input
            data-testid="name-filter"
            type="text"
            id="cardNameFilter"
            name="cardNameFilter"
            onChange={ this.onChangeFilter }
            value={ cardNameFilter }
            disabled={ superTrunfoFilter }
            placeholder="Nome da carta"
          />
        </label>
        <br />
        <br />
        <label htmlFor="cardRareFilter">
          Filtrar por raridade:
          <select
            data-testid="rare-filter"
            id="cardRareFilter"
            name="cardRareFilter"
            onChange={ this.onChangeFilter }
            value={ cardRareFilter }
            disabled={ superTrunfoFilter }
          >
            <option value="todas">todas</option>
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <br />
        <br />
        <label htmlFor="superTrunfoFilter">
          Super Trunfo
          <input
            data-testid="trunfo-filter"
            type="checkbox"
            id="superTrunfoFilter"
            name="superTrunfoFilter"
            checked={ superTrunfoFilter }
            onChange={ this.SuperTrunfoFilter }
          />
        </label>
        <ul>
          {savedCards.map((card) => (
            <Card
              key={ card.cardName }
              cardName={ card.cardName }
              cardDescription={ card.cardDescription }
              cardAttr1={ card.cardAttr1 }
              cardAttr2={ card.cardAttr2 }
              cardAttr3={ card.cardAttr3 }
              cardImage={ card.cardImage }
              cardRare={ card.cardRare }
              cardTrunfo={ card.cardTrunfo }
              removeCard={ this.removeCard }
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
