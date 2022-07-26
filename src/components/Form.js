import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <form>
        <label htmlFor="cardName">
          Nome da carta:
          <input
            data-testid="name-input"
            value={ cardName }
            onChange={ onInputChange }
            type="text"
            name="cardName"
            id="cardName"
          />
        </label>
        <br />
        <br />
        <label htmlFor="cardDescription">
          Descrição da carta:
          <textarea
            data-testid="description-input"
            value={ cardDescription }
            onChange={ onInputChange }
            name="cardDescription"
            id="cardDescription"
          />
        </label>
        <br />
        <br />
        <label htmlFor="cardAttr1">
          Atributo 1:
          <input
            data-testid="attr1-input"
            value={ cardAttr1 }
            onChange={ onInputChange }
            type="number"
            name="cardAttr1"
            id="cardAttr1"

          />
        </label>
        <br />
        <br />
        <label htmlFor="cardAttr2">
          Atributo 2:
          <input
            data-testid="attr2-input"
            value={ cardAttr2 }
            onChange={ onInputChange }
            type="number"
            name="cardAttr2"
            id="cardAttr2"
          />
        </label>
        <br />
        <br />
        <label htmlFor="cardAttr3">
          Atributo 3:
          <input
            data-testid="attr3-input"
            value={ cardAttr3 }
            onChange={ onInputChange }
            type="number"
            name="cardAttr3"
            id="cardAttr3"
          />
        </label>
        <br />
        <br />
        <label htmlFor="cardImage">
          Imagem da carta:
          <input
            data-testid="image-input"
            value={ cardImage }
            onChange={ onInputChange }
            type="text"
            name="cardImage"
            id="cardImage"
          />
        </label>
        <br />
        <br />
        <label htmlFor="cardRare">
          Tipo da carta:
          <select
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
            name="cardRare"
            id="cardRare"
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <br />
        <br />
        <label htmlFor="cardTrunfo">
          Super trunfo:
          {
            hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho</p> : <input
              data-testid="trunfo-input"
              checked={ cardTrunfo }
              onChange={ onInputChange }
              type="checkbox"
              name="cardTrunfo"
              id="cardTrunfo"
            />
          }
        </label>
        <br />
        <br />
        <button
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
          type="button"
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
