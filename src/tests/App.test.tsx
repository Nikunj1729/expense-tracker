import React from 'react';
import * as actions from 'actions'
import * as types from 'actions/types'
import { shallow, mount, render } from 'enzyme';
import App from 'Components/Header';
import Header from 'Components/Header';
import reducer, { uid } from "reducers/transactionReducer";
import { Transations } from 'appConsts/enums';
import logo from 'logo.png';

describe('App', () => {

  it("renders without crashing", () => {
    shallow(<App />);
  });


  it('should render Header correctly with no props', () => {
    const component = shallow(<Header />);

    expect(component).toMatchSnapshot();
  });

  it("renders image header", () => {
    const header = render(<Header />);
    const image = <img alt="logo"
      className="App-logo h-8"
      src="logo.png" />;
    expect(header.find('img')).toHaveLength(1);
  })

  describe('actions', () => {
    it('should create an action to add a transaction', () => {
      const payload = { name: "Transaction", type: Transations.INCOME, amount: 5000 }
      const expectedAction = {
        type: types.ADD_INCOME,
        payload
      }
      expect(actions.addIncome(payload)).toEqual(expectedAction)
    })
  });

  describe('todos reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: '', payload: { name: "Transaction", type: Transations.INCOME, amount: 5000 } })).toEqual(
        {
          transactions: {}
        }
      )
    })
  });

  it('should handle ADD_INCOME', () => {
    expect(
      reducer({
        transactions: {}
      }, {
        type: types.ADD_INCOME,
        payload: { name: "Transaction", type: Transations.INCOME, amount: 5000 }
      })
    ).toMatchObject(
      {
        transactions: {
          [uid]: ["Transaction", "tracker", 5000]
        }
      }
    )
  })

  it('should handle ADD_INCOME', () => {
    expect(
      reducer({
        transactions: { [uid]: ["tracker", "Transaction", 5000] }
      }, {
        type: types.REMOVE_EXPENSE,
        payload: { id: uid }
      })
    ).toMatchObject(
      {
        transactions: {}
      }
    )
  })

});