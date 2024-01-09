import { chain } from 'mathjs'
import { useState } from 'react'
import { ROWS, OPERATIONS, EQUALSIGN } from './rows'

const initialState = {
    value: '',
    calValue: 0,
    actualOperation: '',
}

export default function Calculator() {
    const [value, setValue] = useState(initialState.value)
    const [calValue, setCalValue] = useState(initialState.calValue)
    const [actualOperation, setActualOperation] = useState('')

    const createHandlerClick = el => () => setValue(value.concat(el))
    const equalHandlerClick = () => {
        let result
        switch (actualOperation) {
            case '+':
                result = chain(Number(calValue))
                    .add(Number(value))
                    .done()
                    .toString()
                break
            case '-':
                result = chain(Number(calValue))
                    .subtract(Number(value))
                    .done()
                    .toString()
                break
            case '/':
                value === '0'
                    ? (result = 'Infinity')
                    : (result = chain(Number(calValue))
                          .divide(Number(value))
                          .done()
                          .toString())
                break
            case '*':
                result = chain(Number(calValue))
                    .multiply(Number(value))
                    .done()
                    .toString()
                break
            default:
                break
        }
        setValue(result)
        setCalValue(result)
    }

    const calculate = operation => () => {
        setCalValue(value)
        setValue('')
        setActualOperation(operation)
    }

    const rebootAll = () => () => {
        setValue(initialState.value)
        setCalValue(initialState.calValue)
        setActualOperation(initialState.actualOperation)
    }

    return (
        <>
            <section>
                <h1>Calculator</h1>
                <input
                    type="text"
                    value={value}
                    readOnly
                />
                <div role="grid">
                    <button onClick={rebootAll()}>clear</button>
                    {ROWS.map((row, idx) => (
                        <div
                            key={idx}
                            role="row"
                        >
                            {row.map(number => (
                                <button
                                    onClick={createHandlerClick(number)}
                                    key={number}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                    ))}
                    {OPERATIONS.map(operation => (
                        <button
                            onClick={calculate(operation)}
                            key={operation}
                        >
                            {operation}
                        </button>
                    ))}
                </div>
                <button onClick={() => equalHandlerClick()}>{EQUALSIGN}</button>
            </section>
        </>
    )
}
